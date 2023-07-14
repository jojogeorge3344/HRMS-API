using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class LeaveEligibilityServicecs : AsyncService<LeaveEligibility>, ILeaveEligibilityService
{
    private readonly ILeaveEligibilityRepository leaveEligibilityRepository;
    private readonly ILeaveComponentLopDetailsRepository leaveComponentLopDetails;

    public LeaveEligibilityServicecs(ILeaveEligibilityRepository leaveEligibilityRepository,
        ILeaveComponentLopDetailsRepository leaveComponentLopDetails)
    {
        this.leaveEligibilityRepository = leaveEligibilityRepository;
        this.leaveComponentLopDetails = leaveComponentLopDetails;
    }

    public async Task<IEnumerable<BenefitTypes>> GetBenefitType()
    {
        return await leaveEligibilityRepository.GetBenefitType();
    }

    public async Task<IEnumerable<LeaveEligibility>> GetLeaveConfiguration(int id)
    {
        var leaveEligibility = await leaveEligibilityRepository.GetLeaveConfiguration(id);
        List<LeaveEligibility> leaveEligibilities = (List<LeaveEligibility>)leaveEligibility;
        foreach (LeaveEligibility item in leaveEligibilities)
        {
            item.LeaveComponentLopDetails = (List<LeaveComponentLopDetails>)await leaveComponentLopDetails.GetDetailsByLeaveComponentId(id);
        }
        return leaveEligibility;
    }
    public new async Task<int> InsertAsync(LeaveEligibility leaveEligibility)
    {
        int id = 0;
        id = await leaveEligibilityRepository.InsertAsync(leaveEligibility);
        if (leaveEligibility.LeaveComponentId > 0)
        {
            if (leaveEligibility.LeaveComponentLopDetails != null && leaveEligibility.LeaveComponentLopDetails.Count > 0)
            {
                await leaveComponentLopDetails.BulkInsertAsync(leaveEligibility.LeaveComponentLopDetails);
            }

        }
        return id;
    }

    public new async Task<int> UpdateAsync(LeaveEligibility leaveEligibility)
    {
        int intReturn = await leaveEligibilityRepository.UpdateAsync(leaveEligibility);
        if (leaveEligibility.LeaveComponentId > 0)
        {
            await leaveComponentLopDetails.DeleteByLeaveComponentId(leaveEligibility.LeaveComponentId);
            if (leaveEligibility.LeaveComponentLopDetails != null && leaveEligibility.LeaveComponentLopDetails.Count > 0)
            {
                await leaveComponentLopDetails.BulkInsertAsync(leaveEligibility.LeaveComponentLopDetails);
            }

        }
        return intReturn;
    }
}
