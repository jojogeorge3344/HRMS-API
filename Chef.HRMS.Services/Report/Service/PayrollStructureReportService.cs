using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using Chef.HRMS.Repositories.Report;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
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
            worksheet.Cells[3, 1].Value = "Salary Structure";
            worksheet.Cells[3, 5].Value = "Designation";
            worksheet.Cells[3, 8].Value = "Month";
            worksheet.Cells[5, 1].Value = "PayGroup";
            worksheet.Cells[5, 5].Value = "Employee";
            worksheet.Cells[5, 8].Value = "Year";

            // format the column headers
            worksheet.Cells[3, 1].Style.Font.Bold = true;
            worksheet.Cells[3, 5].Style.Font.Bold = true;
            worksheet.Cells[3, 8].Style.Font.Bold = true;
            worksheet.Cells[5, 1].Style.Font.Bold = true;
            worksheet.Cells[5, 5].Style.Font.Bold = true;
            worksheet.Cells[5, 8].Style.Font.Bold = true;

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
