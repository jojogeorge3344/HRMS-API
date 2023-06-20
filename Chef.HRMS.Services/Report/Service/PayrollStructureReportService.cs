using Castle.Core.Internal;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using Chef.HRMS.Repositories.Report;
using OfficeOpenXml;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using OfficeOpenXml.FormulaParsing.Excel.Functions.Math;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.Drawing;
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

        public async Task<byte[]> PayrollStructureExcelReport(DateTime fromDate, DateTime ToDate, string designationIds, string employeeIds,string departmentIds)
        {
            
            using var excelPackage = new ExcelPackage();

            var worksheet = excelPackage.Workbook.Worksheets.Add("Sheet1");

            //Security provided for excel 
            worksheet.Protection.IsProtected = true;
            worksheet.Protection.AllowAutoFilter = true;

            //Report Caption
            int startColumn = 1; 
            int endColumn = 16; 
            int rowNo = 1; 

            string caption = "PAYSLIP REPORT";
            worksheet.Cells[rowNo, startColumn, rowNo, endColumn].Merge = true;
            worksheet.Cells[rowNo, startColumn].Value = caption;

            //Caption Format
            var captionCell = worksheet.Cells[rowNo, startColumn];
            captionCell.Style.Font.Size = 16;
            captionCell.Style.Font.Bold = true;
            captionCell.Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            captionCell.Style.VerticalAlignment = ExcelVerticalAlignment.Center;

            // Headers
            worksheet.Cells[3, 1].Value = "Month :";
            worksheet.Cells[3, 4].Value = "Year :";
            worksheet.Cells[5, 1].Value = "Employee Code";
            worksheet.Cells[5, 2].Value = "Employee Name";
            worksheet.Cells[5, 3].Value = "Designation";
            worksheet.Cells[5, 4].Value = "Worked Days";
            worksheet.Cells[5, 5].Value = "Date of Join";

            //Fetching data from DB
            var allHeaderComponent = await payrollStructureReportRepository.GetHeaderPayrollComponentNameByDate(fromDate, ToDate);
            List<PayrollComponentExcelReportView> headerData = allHeaderComponent.ToList();
            var employeetList = await payrollStructureReportRepository.GetEmployeePayrollProcessDetailsForExcel(fromDate, ToDate, designationIds, employeeIds,departmentIds);
            List<PayrollExcelReportView> rowData= employeetList.ToList();

            //Dynamic header 
            int i = 0;
            foreach (var header in allHeaderComponent)
            {
                worksheet.Cells[5, 6 + i].Value = header.PayrollComponentCode;
                i++;
            }
            worksheet.Cells[5, 6 + i].Value = "Total";
            int MaxCol = 6 + i;

            //Assigning values to each rows
            int j = 0;
            i = 0;
            decimal Amount = 0;
            string EmployeeCode = string.Empty;

            foreach(var employee in employeetList)
            {
                EmployeeCode = employee.EmployeeCode;
                int month = employee.Month;
                worksheet.Cells[3, 2].Value = month;
                int year = employee.Year;
                worksheet.Cells[3, 5].Value = year;
                worksheet.Cells[6 + j, 1].Value = employee.EmployeeCode;
                worksheet.Cells[6 + j, 2].Value = employee.EmployeeFullName;
                worksheet.Cells[6 + j, 3].Value = employee.DesignationName;
                worksheet.Cells[6 + j, 4].Value = employee.TotalWorkedDays;
                worksheet.Cells[6 + j, 5].Value = employee.DateOfJoin;
                worksheet.Cells[6 + j, 5, worksheet.Dimension.End.Row, 5].Style.Numberformat.Format = "yyyy-mm-dd";

                ////Manage multiple emp
                //if (employee.EmployeeCode != EmployeeCode && !(EmployeeCode.IsNullOrEmpty()))
                //{
                //    j++;
                //    Amount = 0;
                //}

                //Assigning Amt to each EMP
                foreach (var row in allHeaderComponent)
                {
                    if (row.PayrollComponentId == employee.PayrollComponentId)
                    {
                        Amount += (employee.EarningsAmt - employee.DeductionAmt);
                        worksheet.Cells[6 + j, 6 + i].Value = employee.EarningsAmt + employee.DeductionAmt;
                        break;
                    }                   
                }
                i++;
                worksheet.Cells[6 + j, MaxCol].Value = Amount;
            }

            // Format the column headers
            worksheet.Cells[6 + j + 1, 5].Value = "Total";
            worksheet.Cells[3, 1].Style.Font.Bold = true;
            worksheet.Cells[3, 4].Style.Font.Bold = true;
            worksheet.Cells[5, 1, 5, MaxCol].Style.Font.Bold = true;
            var reportHeaders = worksheet.Cells[5, 1, 5, MaxCol];
            reportHeaders.Style.Fill.PatternType = ExcelFillStyle.Solid;
            reportHeaders.Style.Fill.BackgroundColor.SetColor(Color.Gray);

            //Column wise sum for each components
            int asciiValue = 70;

            for (int Col = 0; Col < allHeaderComponent.ToList().Count; Col++)
            {
                worksheet.Cells[6 + j + 1, 5 + Col + 1].Formula = $"SUM("+Convert.ToChar(asciiValue)+$"6:"+Convert.ToChar(asciiValue)+$"{6 + j})";
                asciiValue++;
            }
            worksheet.Cells[6 + j + 1, 5 + allHeaderComponent.ToList().Count + 1].Formula = $"SUM(" + Convert.ToChar(asciiValue) + $"6:" + Convert.ToChar(asciiValue) + $"{6 + j})";
            worksheet.Cells[6 + j + 1, 5, 6 + j + 1, MaxCol + 1].Style.Font.Bold = true;

            // AutoFitColumns for all cells in the worksheet
            worksheet.Cells.AutoFitColumns();

            // save the Excel package to a file stream
            using var stream = new MemoryStream();
            excelPackage.SaveAs(stream);

            return await Task.FromResult(stream.ToArray());
        }
    }
}
