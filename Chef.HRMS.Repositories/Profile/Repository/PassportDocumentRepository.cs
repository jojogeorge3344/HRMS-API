using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class PassportDocumentRepository : GenericRepository<PassportDocument>, IPassportDocumentRepository
    {
        public PassportDocumentRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }
    }
}
