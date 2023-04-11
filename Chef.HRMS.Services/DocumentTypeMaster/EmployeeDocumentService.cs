using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.IO;

namespace Chef.HRMS.Services
{
    public class EmployeeDocumentService : AsyncService<EmployeeDocument>, IEmployeeDocumentService
    {
        private readonly IEmployeeDocumentRepository employeeDocumentRepository;

        public EmployeeDocumentService(IEmployeeDocumentRepository employeeDocumentRepository)
        {
            this.employeeDocumentRepository = employeeDocumentRepository;
        }

        public async Task<IEnumerable<EmployeeDocument>> GetEmployeeId(int id)
        {
            return await employeeDocumentRepository.GetEmployeeId(id);
        }
        public async Task<IEnumerable<EmployeeDocumentAttachment>> GetAllByEmployeeId(int employeeId, int documentid)
        {
            return await employeeDocumentRepository.GetAllByEmployeeId(employeeId, documentid);
        }

        public async Task<bool> IsDocumentCodeExist(string documentnumber)
        {
            return await employeeDocumentRepository.IsDocumentCodeExist(documentnumber);
        }

        public async Task<byte[]> GetPDFViewer(string filePath)
        {
            return File.ReadAllBytes(filePath);
        }

        //public Task<string> ConvertPdfToHtml(byte[] pdfBytes)
        //{
        //    //PdfDocument pdfDoc = PdfReader.Open(new MemoryStream(pdfBytes));
        //    //using (var ms = new MemoryStream())
        //    //{
        //    //    HtmlConverter.ConvertToHtml(pdfDoc, ms);
        //    //    ms.Position = 0;
        //    //    StreamReader sr = new StreamReader(ms);
        //    //    return sr.ReadToEnd();
        //    //}
        //    using (var pdfReader = new iText.Kernel.Pdf.PdfReader(new MemoryStream(pdfBytes)))
        //    {
        //        using (var ms = new MemoryStream())
        //        {
        //            var writerProperties = new WriterProperties();
        //            HtmlConverter.ConvertToPdf(pdfReader, ms, writerProperties);
        //            ms.Position = 0;
        //            using (var sr = new StreamReader(ms))
        //            {
        //                return sr.ReadToEnd();
        //            }
        //        }
        //    }
        //}
    }
}
