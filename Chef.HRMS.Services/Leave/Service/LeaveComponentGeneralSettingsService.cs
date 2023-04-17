using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LeaveComponentGeneralSettingsService : AsyncService<LeaveComponentGeneralSettings>, ILeaveComponentGeneralSettingsService
    {
        private readonly ILeaveComponentGeneralSettingsRepository leaveComponentGeneralSettingsRepository;

        public LeaveComponentGeneralSettingsService(ILeaveComponentGeneralSettingsRepository leaveComponentGeneralSettingsRepository)
        {
            this.leaveComponentGeneralSettingsRepository = leaveComponentGeneralSettingsRepository;
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public async Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId)
        {
            return await leaveComponentGeneralSettingsRepository.DeleteAsync(leaveStructureId, leaveComponentId);
        }

        public Task<IEnumerable<LeaveComponentGeneralSettings>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<LeaveComponentGeneralSettings> GetAsync(int leaveStructureId, int leaveComponentId)
        {
            return await leaveComponentGeneralSettingsRepository.GetAsync(leaveStructureId, leaveComponentId);
        }

        public Task<LeaveComponentGeneralSettings> GetAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<LeaveComponentGeneralSettings> InsertAsync(LeaveComponentGeneralSettings leaveComponentGeneralSettings)
        {
            throw new System.NotImplementedException();
        }

        public async Task<int> InsertOrUpdateAsync(LeaveComponentGeneralSettings leaveComponentGeneralSettings)
         {
            int data = await leaveComponentGeneralSettingsRepository.InsertOrUpdateAsync(leaveComponentGeneralSettings);
            if (data != 0)
            {
                var structureId = leaveComponentGeneralSettings.LeaveStructureId;
                await leaveComponentGeneralSettingsRepository.SetLeaveStructureIsConfigured(structureId);
            }

            return data;
        }

        public Task<int> UpdateAsync(LeaveComponentGeneralSettings leaveComponentGeneralSettings)
        {
            throw new System.NotImplementedException();
        }
    }
}