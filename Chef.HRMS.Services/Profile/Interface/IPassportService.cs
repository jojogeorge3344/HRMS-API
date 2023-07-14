using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPassportService : IAsyncService<Passport>
{
    Task<IEnumerable<PassportView>> GetByEmployeeId(int employeeId);
}
