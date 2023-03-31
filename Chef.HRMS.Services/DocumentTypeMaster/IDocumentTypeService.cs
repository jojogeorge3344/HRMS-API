using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IDocumentTypeService : IAsyncService<DocumentDetail>
    {   
        Task<bool> IsDocumentCodeExist(string code);
    }
}
