using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface ILeaveComponentGeneralSettingsService : IAsyncService<LeaveComponentGeneralSettings>
{
    Task<LeaveComponentGeneralSettings> GetAsync(int leaveStructureId, int leaveComponentId);
    Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId);
    Task<int> InsertOrUpdateAsync(LeaveComponentGeneralSettings leaveComponentGeneralSettings);
}