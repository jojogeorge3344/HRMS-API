using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.IO;

namespace Chef.HRMS.Services
{
    public class BulkUploadService : AsyncService<Leave>, IBulkUploadService
    {
        private readonly IBulkUploadRepository bulkUploadRepository;

        public BulkUploadService(IBulkUploadRepository bulkUploadRepository)
        {
            this.bulkUploadRepository = bulkUploadRepository;
        }

        public async Task<int> RegularLoginBulkInsert(IEnumerable<RegularLogin> regularLogins)
        {
           
                int intRtn = await ImportExcelValidation(regularLogins);
                if (intRtn > 0)
                {
                    int Result = await bulkUploadRepository.RegularLoginBulkInsert(regularLogins);
                }
                else
                {
                    return 0;
                } 
                    return intRtn;
        }

        private async Task<int> ImportExcelValidation(IEnumerable<RegularLogin> regularLogins)
        {
            if (regularLogins != null)
            {
                foreach (RegularLogin regularLoginDetails in regularLogins)
                {
                    if (regularLoginDetails.EmployeeCode != null)
                    {
                        bool isEmployeeIdExist = await bulkUploadRepository.GetEmployeeCodeExist(regularLoginDetails.EmployeeCode);
                        if (!isEmployeeIdExist)
                        {
                            throw new Exception("Employee Code does not exist");
                        }
                    }
                    else
                    {
                        throw new Exception("Employee Code is null");
                    }
                }
            }
            else
            {
                throw new Exception("Empty Data source");
            }
            return 1;
        }
        public async Task<int> BulkInsertLeave(IEnumerable<Leave> leave)
        {
            return await bulkUploadRepository.BulkInsertLeave(leave);
        }

        public async Task<int> BulkInsertOnduty(IEnumerable<OnDuty> onDuty)
        {
            return await bulkUploadRepository.BulkInsertOnduty(onDuty);
        }

        public async Task<int> BulkInsertRegularLogin(IEnumerable<RegularLogin> regularLogin)
        {
            return await bulkUploadRepository.BulkInsertRegularLogin(regularLogin);
        }

        public async Task<int> BulkInsertWorkFromHome(IEnumerable<WorkFromHome> workFromHome)
        {
            return await bulkUploadRepository.BulkInsertWorkFromHome(workFromHome);
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<byte[]> ExportExcelFormat()
        {

            // create a new Excel package       
            using var excelPackage = new ExcelPackage();

            // add a new worksheet to the workbook
            var worksheet = excelPackage.Workbook.Worksheets.Add("Sheet1");
            worksheet.Protection.IsProtected = false;
            worksheet.Protection.AllowAutoFilter = true;

            // define the column headers
            worksheet.Cells[1, 1].Value = "EmployeeCode";
            worksheet.Cells[1, 2].Value = "Date";
            worksheet.Cells[1, 3].Value = "clockIn";
            worksheet.Cells[1, 4].Value = "clockOut";
            worksheet.Cells[1, 5].Value = "effectiveHours";
            worksheet.Cells[1, 6].Value = "grossHours";
            worksheet.Cells[1, 7].Value = "attendanceType";
            worksheet.Cells[1, 8].Value = "Log";

            // Set column data types
            worksheet.Cells[1, 1, worksheet.Dimension.End.Row, 1].Style.Numberformat.Format = "@"; // Emp Code column 
            worksheet.Cells[1, 2, worksheet.Dimension.End.Row, 2].Style.Numberformat.Format = "yyyy-mm-dd"; // Date column
            worksheet.Cells[1, 3, worksheet.Dimension.End.Row, 3].Style.Numberformat.Format = "hh:mm:ss"; // In Time column
            worksheet.Cells[1, 4, worksheet.Dimension.End.Row, 4].Style.Numberformat.Format = "hh:mm:ss"; // Out Time column
            worksheet.Cells[1, 5, worksheet.Dimension.End.Row, 5].Style.Numberformat.Format = "hh:mm"; // Working Hours column
            worksheet.Cells[1, 6, worksheet.Dimension.End.Row, 6].Style.Numberformat.Format = "hh:mm"; // Gross Hours column
            worksheet.Cells[1, 7, worksheet.Dimension.End.Row, 7].Style.Numberformat.Format = "@"; // Attendance Type column
            worksheet.Cells[1, 8, worksheet.Dimension.End.Row, 8].Style.Numberformat.Format = "@"; // Log column 
            
            // format the column headers
            worksheet.Cells[1, 1, 1, 8].Style.Font.Bold = true;
            worksheet.Cells[1, 1, 1, 8].AutoFilter = true;
            worksheet.Cells[1, 1, 1, 8].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[1, 1, 1, 8].AutoFitColumns();

            //Set column width
            worksheet.Column(1).Width = 25;
            worksheet.Column(2).Width = 25;
            worksheet.Column(3).Width = 25;
            worksheet.Column(4).Width = 25;
            worksheet.Column(5).Width = 25;
            worksheet.Column(6).Width = 25;
            worksheet.Column(7).Width = 25;
            worksheet.Column(8).Width = 25;

            // Add dropdown list to the 7th column
            var dropdownValues = new List<string> { "WebCheckin", "Swiping" };
            var dropdown = worksheet.DataValidations.AddListValidation("G2:G1048576");
            foreach (var value in dropdownValues)
            {
                dropdown.Formula.Values.Add(value);
            }

            // save the Excel package to a file stream
            using var stream = new MemoryStream();
            excelPackage.SaveAs(stream);

            return await Task.FromResult(stream.ToArray());

        }

        public Task<IEnumerable<Leave>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<Leave> GetAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<Leave> InsertAsync(Leave obj)
        {
            throw new NotImplementedException();
        }

        public Task<int> UpdateAsync(Leave obj)
        {
            throw new NotImplementedException();
        }
    }
}
