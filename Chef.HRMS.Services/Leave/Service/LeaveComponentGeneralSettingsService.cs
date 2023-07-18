using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class LeaveComponentGeneralSettingsService : AsyncService<LeaveComponentGeneralSettings>, ILeaveComponentGeneralSettingsService
{
    private readonly ILeaveComponentGeneralSettingsRepository leaveComponentGeneralSettingsRepository;

    public LeaveComponentGeneralSettingsService(ILeaveComponentGeneralSettingsRepository leaveComponentGeneralSettingsRepository)
    {
        this.leaveComponentGeneralSettingsRepository = leaveComponentGeneralSettingsRepository;
    }
 
    public async Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId)
    {
        return await leaveComponentGeneralSettingsRepository.DeleteAsync(leaveStructureId, leaveComponentId);
    }
 

    public async Task<LeaveComponentGeneralSettings> GetAsync(int leaveStructureId, int leaveComponentId)
    {
        return await leaveComponentGeneralSettingsRepository.GetAsync(leaveStructureId, leaveComponentId);
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
}