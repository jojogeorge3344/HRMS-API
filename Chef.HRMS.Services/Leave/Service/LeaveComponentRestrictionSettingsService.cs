using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveComponentRestrictionSettingsService : AsyncService, ILeaveComponentRestrictionSettingsService
    {
        private readonly ILeaveComponentRestrictionSettingsRepositry leaveComponentRestrictionSettings;

        public LeaveComponentRestrictionSettingsService(ILeaveComponentRestrictionSettingsRepositry leaveComponentRestrictionSettings)
        {
            this.leaveComponentRestrictionSettings = leaveComponentRestrictionSettings;
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId)
        {
            return await leaveComponentRestrictionSettings.DeleteAsync(leaveStructureId, leaveComponentId);
        }

        public Task<IEnumerable<LeaveComponentRestrictionSettings>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<LeaveComponentRestrictionSettings> GetAsync(int leaveStructureId, int leaveComponentId)
        {
            return await leaveComponentRestrictionSettings.GetAsync(leaveStructureId, leaveComponentId);
        }

        public Task<LeaveComponentRestrictionSettings> GetAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<LeaveComponentRestrictionSettings> InsertAsync(LeaveComponentRestrictionSettings leaveComponentRestrictionSettings)
        {
            throw new System.NotImplementedException();
        }

        public async Task<int> InsertOrUpdateAsync(LeaveComponentRestrictionSettings leaveRestrictionSettings)
        {
            return await leaveComponentRestrictionSettings.InsertOrUpdateAsync(leaveRestrictionSettings);
        }

        public Task<int> UpdateAsync(LeaveComponentRestrictionSettings leaveComponentRestrictionSettings)
        {
            throw new System.NotImplementedException();
        }
    }
}