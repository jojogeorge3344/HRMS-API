using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface ILeaveComponentRestrictionSettingsService : IAsyncService<LeaveComponentRestrictionSettings>
    {
        Task<LeaveComponentRestrictionSettings> GetAsync(int leaveStructureId, int leaveComponentId);
        Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId);
        Task<int> InsertOrUpdateAsync(LeaveComponentRestrictionSettings leaveComponentRestrictionSettings);
    }
}