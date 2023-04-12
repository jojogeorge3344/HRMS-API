using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;
using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Chef.HRMS.Services
{
    public class BulkUploadService : AsyncService<Leave>, IBulkUploadService
    {
        private readonly IBulkUploadRepository bulkUploadRepository;

        public BulkUploadService(IBulkUploadRepository bulkUploadRepository)
        {
            this.bulkUploadRepository = bulkUploadRepository;
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
            worksheet.Cells[1, 1].Value = "Date";
            worksheet.Cells[1, 2].Value = "clockIn";
            worksheet.Cells[1, 3].Value = "clockOut";
            worksheet.Cells[1, 4].Value = "effectiveHours";
            worksheet.Cells[1, 5].Value = "grossHours";
            worksheet.Cells[1, 6].Value = "attendanceType";
            worksheet.Cells[1, 7].Value = "Log";

            // format the column headers
            worksheet.Cells[1, 1, 1, 7].Style.Font.Bold = true;
            worksheet.Cells[1, 1, 1, 7].AutoFilter = true;
            worksheet.Cells[1, 1, 1, 7].Style.HorizontalAlignment = ExcelHorizontalAlignment.Center;
            worksheet.Cells[1, 1, 1, 7].AutoFitColumns();

            //Set column width
            worksheet.Column(1).Width = 25;
            worksheet.Column(2).Width = 25;
            worksheet.Column(3).Width = 15;
            worksheet.Column(4).Width = 25;
            worksheet.Column(5).Width = 25;
            worksheet.Column(6).Width = 25;
            worksheet.Column(7).Width = 25;

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
