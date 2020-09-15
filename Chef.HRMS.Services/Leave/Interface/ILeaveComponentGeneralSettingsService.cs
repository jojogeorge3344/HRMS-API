using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface ILeaveComponentGeneralSettingsService : IAsyncService<LeaveComponentGeneralSettings>
    {
        Task<LeaveComponentGeneralSettings> GetAsync(int leaveStructureId, int leaveComponentId);
        Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId);
        Task<int> InsertOrUpdateAsync(LeaveComponentGeneralSettings leaveComponentGeneralSettings);
    }
}