using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using Chef.HRMS.Repositories.Report;
using OfficeOpenXml;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.Report
{
    public class PayrollStructureReportService : AsyncService<PayrollStructureReportView>, IPayrollStructureReportService
    {
        private readonly IPayrollStructureReportRepository payrollStructureReportRepository;

        public PayrollStructureReportService(IPayrollStructureReportRepository payrollStructureReportRepository)
        {
            this.payrollStructureReportRepository = payrollStructureReportRepository;
        }

        public async Task<IEnumerable<PayrollStructureReportView>> GetEmployeePayrollProcessDetails(DateTime fromDate, DateTime ToDate, string payrollStructureIds, string paygroupIds, string designationIds, string employeeIds)
        {
            return await payrollStructureReportRepository.GetEmployeePayrollProcessDetails(fromDate, ToDate, payrollStructureIds, paygroupIds, designationIds, employeeIds);
        }

        public async Task<byte[]> PayrollStructureExcelReport(DateTime fromDate, DateTime ToDate, string payrollStructureIds, string paygroupIds, string designationIds, string employeeIds)
        {
            // create a new Excel package       
            using var excelPackage = new ExcelPackage();

            // add a new worksheet to the workbook
            var worksheet = excelPackage.Workbook.Worksheets.Add("Sheet1");
            worksheet.Protection.IsProtected = true;
            worksheet.Protection.AllowAutoFilter = true;

            // define the column headers
            worksheet.Cells[3, 1].Value = "Salary Structure :";
            worksheet.Cells[3, 4].Value = "Designation :";
            worksheet.Cells[3, 7].Value = "Month :";
            worksheet.Cells[5, 1].Value = "PayGroup :";
            worksheet.Cells[5, 4].Value = "Employee :";
            worksheet.Cells[5, 7].Value = "Year :";
            worksheet.Cells[7, 1].Value = "Employee Code";
            worksheet.Cells[7, 2].Value = "Employee Name";
            worksheet.Cells[7, 3].Value = "Designation";
            worksheet.Cells[7, 4].Value = "Salary Structure";
            worksheet.Cells[7, 5].Value = "PayGroup";

            //components dynamic values setting
            var headerComponent = await payrollStructureReportRepository.GetHeaderPayrollComponentNameByStructureId(payrollStructureIds);
            var reportList = await payrollStructureReportRepository.GetEmployeePayrollProcessDetails(fromDate, ToDate, payrollStructureIds, paygroupIds, designationIds, employeeIds);
            List<PayrollComponentConfiguration> headerData = headerComponent.ToList();
            List<PayrollStructureReportView> rowData= reportList.ToList();

            int i = 0;
            foreach (var item in headerComponent)
            {
                worksheet.Cells[7, 6 + i].Value = item.Name;
                i++;
            }
            worksheet.Cells[7, 6+i].Value = "Net Amount";

            //Assigning values to each rows
            int j = 0;
            i= 0;
            string EmployeeCode = string.Empty;
            foreach(var item in reportList)
            {
                if (item.EmployeeCode != EmployeeCode )//&& !IsNullOrEmpty(EmployeeCode))
                { 
                 j++;
                }
                EmployeeCode = item.EmployeeCode;
                worksheet.Cells[3, 2].Value = item.SalaryStructureName;
                worksheet.Cells[3, 5].Value = item.DesignationName;
                DateTime test = item.PayrollProcessDate;
                int month = test.Month;
                worksheet.Cells[3, 8].Value = month;
                worksheet.Cells[5, 2].Value = item.PaygroupName;
                worksheet.Cells[5, 5].Value = item.EmployeeFullName;
                int year = test.Year;
                worksheet.Cells[5, 8].Value = year;
                worksheet.Cells[8 + j, 1].Value = item.EmployeeCode;
                worksheet.Cells[8 + j, 2].Value = item.EmployeeFullName;
                worksheet.Cells[8 + j, 3].Value = item.DesignationName;
                worksheet.Cells[8 + j, 4].Value = item.SalaryStructureName;
                worksheet.Cells[8 + j, 5].Value = item.PaygroupName;
                //worksheet.Cells[8 + j, 6].Value = item.EarningsAmt + item.DeductionAmt;
                //i = 0;
                foreach (var row in headerComponent)
                {
                    if (row.Name == worksheet.Cells[7, 6 + i].Value)
                    {
                        worksheet.Cells[8+j, 6 + i].Value = item.EarningsAmt+item.DeductionAmt;
                        break;
                    }                   
                }
                i++;
                decimal netAmount = item.EarningsAmt - item.DeductionAmt;
                worksheet.Cells[8 + j, 6 + i + 1].Value = netAmount;
            }

            // format the column headers
            worksheet.Cells[3, 1].Style.Font.Bold = true;
            worksheet.Cells[3, 4].Style.Font.Bold = true;
            worksheet.Cells[3, 7].Style.Font.Bold = true;
            worksheet.Cells[5, 1].Style.Font.Bold = true;
            worksheet.Cells[5, 4].Style.Font.Bold = true;
            worksheet.Cells[5, 7].Style.Font.Bold = true;
            worksheet.Cells[7, 1, 7, 20].Style.Font.Bold = true;

            // Merge the range of cells


            // AutoFitColumns for all cells in the worksheet
            worksheet.Cells.AutoFitColumns();
            //worksheet.Cells[1, 1, 1, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;

            // save the Excel package to a file stream
            using var stream = new MemoryStream();
            excelPackage.SaveAs(stream);

            return await Task.FromResult(stream.ToArray());
        }
    }
}
