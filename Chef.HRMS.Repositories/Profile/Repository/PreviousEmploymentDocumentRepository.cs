using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class PreviousEmploymentDocumentRepository : GenericRepository<PreviousEmploymentDocument>, IPreviousEmploymentDocumentRepository
    {
        public PreviousEmploymentDocumentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }
    }
}