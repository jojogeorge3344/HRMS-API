using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class EmployeeLetterDocumentRepository : GenericRepository<EmployeeLetterDocument>, IEmployeeLetterDocumentRepository
    {
        public EmployeeLetterDocumentRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }
    }
}
