using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface ILeaveEligibilityService : IAsyncService<LeaveEligibility>
{
    Task<IEnumerable<LeaveEligibility>> GetLeaveConfiguration(int id);
    Task<IEnumerable<BenefitTypes>> GetBenefitType();
    new Task<int> InsertAsync(LeaveEligibility leaveEligibility);
    new Task<int> UpdateAsync(LeaveEligibility leaveEligibility);

}
