using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Threading.Tasks;
using Chef.Common.Core.Services;

namespace Chef.HRMS.Services
{
    public interface ILeaveComponentGeneralSettingsService : IAsyncService<LeaveComponentGeneralSettings>
    {
        Task<LeaveComponentGeneralSettings> GetAsync(int leaveStructureId, int leaveComponentId);
        Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId);
        Task<int> InsertOrUpdateAsync(LeaveComponentGeneralSettings leaveComponentGeneralSettings);
    }
}