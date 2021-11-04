using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class PANDocumentRepository : GenericRepository<PANDocument>, IPANDocumentRepository
    {
        public PANDocumentRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }
    }
}
