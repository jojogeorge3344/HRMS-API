using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IWPSUserService : IAsyncService<WPSUser>
{
    Task<IEnumerable<WPSUser>> GetAllByemployeeId(int employeeId);
    Task<IEnumerable<HRMSBank>> GetBank();
}
