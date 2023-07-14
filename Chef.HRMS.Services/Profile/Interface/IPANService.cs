using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IPANService : IAsyncService<PAN>
{
    Task<IEnumerable<PANView>> GetByEmployeeId(int employeeId);
}
