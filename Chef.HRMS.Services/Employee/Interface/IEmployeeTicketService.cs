using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IEmployeeTicketService : IAsyncService<EmployeeTicket>
{
    Task<IEnumerable<EmployeeTicket>> GetTicketDetailsByEmployeeId(int employeeId);
    Task<bool> IsTravelFromExist(string fromPlace);
}