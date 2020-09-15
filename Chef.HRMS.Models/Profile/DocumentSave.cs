using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace Chef.HRMS.Models
{
    public class DocumentSave
    {
        /// <summary>
        /// Holds the uploaded file/s data
        /// </summary>
        public IList<IFormFile> Document { get; set; }

        /// <summary>
        /// Holds the path of the uploaded file
        /// </summary>
        public string Path { get; set; }
    }
}
