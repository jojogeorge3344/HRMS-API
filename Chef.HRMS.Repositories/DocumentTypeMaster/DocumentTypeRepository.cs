using Chef.Common.Core.Extensions;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class DocumentTypeRepository : TenantRepository<Models.DocumentDetail>, IDocumentTypeRepository
    {
        public DocumentTypeRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }

        public async Task<bool> IsDocumentCodeExist(string code)
        {
            if (await QueryFactory
           .Query<DocumentDetail>()
           .Where("code", code)
           .WhereNotArchived()
           .CountAsync<int>() > 0) return true;
            else return false;
        }
    }
}
