using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IOverTimePolicyService : IAsyncService<OverTimePolicy>
{
    Task<IEnumerable<int>> GetAllAssignedOverTimePolicy();
    Task<IEnumerable<OverTimePolicy>> GetAllAssignedOverTimePolicyCount();
    Task<IEnumerable<OverTimePolicy>> GetAllConfiguredOvertimePolicies();
    Task<int> UpdateOverTimePolicy(int id);
    Task<IEnumerable<BenefitTypes>> GetBenefitType();
}
