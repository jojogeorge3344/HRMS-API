using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IDocumentTypeMasterRepository : IGenericRepository<Models.DocumentTypeMaster>
    {
        Task<IEnumerable<DocumentTypeMaster>> GetEmployeeId(int id);
    }
}
