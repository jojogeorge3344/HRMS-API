using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class LeaveComponentRestrictionSettingsService : AsyncService<LeaveComponentRestrictionSettings>, ILeaveComponentRestrictionSettingsService
{
    private readonly ILeaveComponentRestrictionSettingsRepositry leaveComponentRestrictionSettings;

    public LeaveComponentRestrictionSettingsService(ILeaveComponentRestrictionSettingsRepositry leaveComponentRestrictionSettings)
    {
        this.leaveComponentRestrictionSettings = leaveComponentRestrictionSettings;
    } 

    public async Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId)
    {
        return await leaveComponentRestrictionSettings.DeleteAsync(leaveStructureId, leaveComponentId);
    } 

    public async Task<LeaveComponentRestrictionSettings> GetAsync(int leaveStructureId, int leaveComponentId)
    {
        return await leaveComponentRestrictionSettings.GetAsync(leaveStructureId, leaveComponentId);
    } 

    public async Task<int> InsertOrUpdateAsync(LeaveComponentRestrictionSettings leaveRestrictionSettings)
    {
        return await leaveComponentRestrictionSettings.InsertOrUpdateAsync(leaveRestrictionSettings);
    } 
}