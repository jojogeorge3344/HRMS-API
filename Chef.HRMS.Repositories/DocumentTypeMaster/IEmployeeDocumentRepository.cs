using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeDocumentRepository : IGenericRepository<EmployeeDocument>
    {
        Task<IEnumerable<EmployeeDocument>> GetEmployeeId(int id);
        Task<IEnumerable<EmployeeDocumentAttachment>> GetAllByEmployeeId(int employeeId, int documentid);

    }
}
