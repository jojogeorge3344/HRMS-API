using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IDependentService : IAsyncService<Dependent>
{
    Task<IEnumerable<Dependent>> GetAllByEmployeeId(int employeeId);
}
