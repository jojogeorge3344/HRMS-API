using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class EmployeeDefaultsRepository : GenericRepository<EmployeeDefaults>, IEmployeeDefaultsRepository
    {
        public EmployeeDefaultsRepository(DbSession session) : base(session)
        {
        }
    }
}