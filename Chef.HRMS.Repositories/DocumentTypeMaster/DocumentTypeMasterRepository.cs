using Chef.Common.Core.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class DocumentTypeMasterRepository : TenantRepository<Models.DocumentTypeMaster>, IDocumentTypeMasterRepository
    {
        public DocumentTypeMasterRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }

        public async Task<IEnumerable<DocumentTypeMaster>> GetEmployeeId(int id)
        {
            return await QueryFactory
           .Query<DocumentTypeMaster>()
           .Where("employeeid", id)
           .WhereNotArchived()
           .GetAsync<DocumentTypeMaster>();
        }
    }
}
