using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IMyProfileService : IAsyncService<MyProfileView>
{
    Task<MyProfileView> GetMyProfileDetailsAsync(int employeeId);
}
