using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class EmployeeLetterRepository : GenericRepository<EmployeeLetter>, IEmployeeLetterRepository
    {
        public EmployeeLetterRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }
    }
}