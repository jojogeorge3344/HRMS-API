using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class EmployeeLetterDocumentRepository : GenericRepository<EmployeeLetterDocument>, IEmployeeLetterDocumentRepository
    {
        public EmployeeLetterDocumentRepository(DbSession session) : base(session)
        {
        }
    }
}
