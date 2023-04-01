using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Net.Http.Headers;
using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Pipelines;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class DocumentTypeService : AsyncService<DocumentDetail>, IDocumentTypeService
    {
        private readonly IDocumentTypeRepository documentTypeMasterRepository;

        public DocumentTypeService(IDocumentTypeRepository documentTypeMasterRepository)
        {
            this.documentTypeMasterRepository = documentTypeMasterRepository;
        }

        public async Task<bool> IsDocumentCodeExist(string code)
        {
            return await documentTypeMasterRepository.IsDocumentCodeExist(code);
        }
        //public async Task<string> DownloadPdf(string pdfGuid)
        //{
        //    var generatePdfsRetrieveUrl = "c:\\Company\\Branch\\Education\\45\\";

        //    var uri = new Uri(generatePdfsRetrieveUrl + pdfGuid + ".pdf");

        //    using (var client = new HttpClient())
        //    {
        //        var response = await client.GetAsync(uri);

        //        var pdfBytes = await response.Content.ReadFromJsonAsync<byte[]>();

        //        var fileName = $"{pdfGuid}.pdf";

        //        var filePath = Path.Combine("Downloads", fileName);

        //        using (var fileStream = new FileStream(filePath, FileMode.Create))

        //        {
        //            await fileStream.WriteAsync(pdfBytes);

        //        }
        //        return File(pdfBytes, "application/pdf", fileName);

        //    }
        //}
        //private string File(byte[] pdfBytes, string v, string fileName)
        //{
        //    throw new NotImplementedException();
        //}
    }
}