using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeTicketService : IAsyncService<EmployeeTicket>
    {
        Task<IEnumerable<EmployeeTicket>> GetTicketDetailsByEmployeeId(int employeeId);
        Task<bool> IsTravelFromExist(string fromPlace);
    }
}