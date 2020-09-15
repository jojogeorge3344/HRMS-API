using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILeaveComponentGeneralSettingsRepository : IGenericRepository<LeaveComponentGeneralSettings>
    {
        Task<LeaveComponentGeneralSettings> GetAsync(int leaveStructureId, int leaveComponentId);
        Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId);
        Task<int> InsertOrUpdateAsync(LeaveComponentGeneralSettings leaveComponentGeneralSettings);
        Task<int> SetLeaveStructureIsConfigured(int leaveStructureId);
    }
}