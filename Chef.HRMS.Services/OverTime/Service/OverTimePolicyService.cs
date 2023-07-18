using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class OverTimePolicyService : AsyncService<OverTimePolicy>, IOverTimePolicyService
{
    private readonly IOverTimePolicyRepository overTimePolicyRepository;

    public OverTimePolicyService(IOverTimePolicyRepository overTimePolicyRepository)
    {
        this.overTimePolicyRepository = overTimePolicyRepository;
    }

    public async Task<IEnumerable<int>> GetAllAssignedOverTimePolicy()
    {
        return await overTimePolicyRepository.GetAllAssignedOverTimePolicy();
    }

    public async Task<IEnumerable<OverTimePolicy>> GetAllAssignedOverTimePolicyCount()
    {
        return await overTimePolicyRepository.GetAllAssignedOverTimePolicyCount();
    }

    public async Task<IEnumerable<OverTimePolicy>> GetAllConfiguredOvertimePolicies()
    {
        return await overTimePolicyRepository.GetAllConfiguredOvertimePolicies();
    }

    public async Task<IEnumerable<BenefitTypes>> GetBenefitType()
    {
        return await overTimePolicyRepository.GetBenefitType();
    }

    public async Task<int> UpdateOverTimePolicy(int id)
    {
        return await overTimePolicyRepository.UpdateOverTimePolicy(id);
    }
}
