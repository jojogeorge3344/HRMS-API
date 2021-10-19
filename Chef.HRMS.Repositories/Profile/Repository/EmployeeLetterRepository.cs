using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class EmployeeLetterRepository : GenericRepository<EmployeeLetter>, IEmployeeLetterRepository
    {
        public EmployeeLetterRepository(DbSession session) : base(session)
        {
        }
    }
}