using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IDrivingLicenseService : IAsyncService<DrivingLicense>
{
    Task<IEnumerable<DrivingLicenseView>> GetByEmployeeId(int employeeId);
}
