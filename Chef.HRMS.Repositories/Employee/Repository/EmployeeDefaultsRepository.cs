using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class EmployeeDefaultsRepository : GenericRepository<EmployeeDefaults>, IEmployeeDefaultsRepository
    {
        public EmployeeDefaultsRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }
    }
}