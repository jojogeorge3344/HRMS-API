using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IContactService : IAsyncService<Contact>
{
    Task<IEnumerable<Contact>> GetAllByEmployeeId(int employeeId);
}
