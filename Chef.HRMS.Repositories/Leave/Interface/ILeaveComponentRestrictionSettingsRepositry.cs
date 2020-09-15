using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILeaveComponentRestrictionSettingsRepositry : IGenericRepository<LeaveComponentRestrictionSettings>
    {
        Task<LeaveComponentRestrictionSettings> GetAsync(int leaveStructureId, int leaveComponentId);
        Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId);
        Task<int> InsertOrUpdateAsync(LeaveComponentRestrictionSettings leaveComponentRestrictionSettings);
    }
}