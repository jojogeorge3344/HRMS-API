using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers.Profile
{
    [ApiController]
    [Route("api/profile/[controller]")]
    public class DocumentSaveController : ControllerBase
    {
        [HttpPost("FileUploadDelete")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public IActionResult Delete([FromForm] string path)
        {
            try
            {
                FileInfo fileInfo = new FileInfo(path);
                fileInfo.Delete();
            }
            catch (IOException e)
            {
                Console.WriteLine(e.Message);
            }
            return Ok(new { count = 1 });
        }

        [HttpPost("FileUpload")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Upload([FromForm] DocumentSave documentSave)
        {
            if (documentSave.Document == null || documentSave.Document.Count == 0)
                return Content("file not selected");

            long size = documentSave.Document.Sum(f => f.Length);
            var filePaths = new List<string>();

            foreach (var formFile in documentSave.Document)
            {
                if (formFile.Length > 0)
                {
                    string filePath = documentSave.Path; // all these data want to fetch from config file

                    if (!Directory.Exists(filePath))
                    {
                        //Creating destination folder.
                        DirectoryInfo di = Directory.CreateDirectory(filePath);
                    }

                    filePaths.Add(filePath);
                    var fileNameWithPath = string.Concat(filePath, "\\", formFile.FileName);

                    using FileStream stream = new FileStream(fileNameWithPath, FileMode.Create);
                    await formFile.CopyToAsync(stream);
                }
            }
            // Process uploaded files
            return Ok(new { count = documentSave.Document.Count, size, filePaths });
        }

    }
}