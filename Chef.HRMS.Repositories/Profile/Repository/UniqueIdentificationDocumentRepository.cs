using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class UniqueIdentificationDocumentRepository : GenericRepository<UniqueIdentificationDocument>, IUniqueIdentificationDocumentRepository
    {
        public UniqueIdentificationDocumentRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }
    }
}
