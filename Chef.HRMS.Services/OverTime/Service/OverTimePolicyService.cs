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

    public async Task<int> DeleteAsync(int id)
    {
        return await overTimePolicyRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<int>> GetAllAssignedOverTimePolicy()
    {
        return await overTimePolicyRepository.GetAllAssignedOverTimePolicy();
    }

    public async Task<IEnumerable<OverTimePolicy>> GetAllAssignedOverTimePolicyCount()
    {
        return await overTimePolicyRepository.GetAllAssignedOverTimePolicyCount();
    }

    public async Task<IEnumerable<OverTimePolicy>> GetAllAsync()
    {
        return await overTimePolicyRepository.GetAllAsync();
    }

    public async Task<IEnumerable<OverTimePolicy>> GetAllConfiguredOvertimePolicies()
    {
        return await overTimePolicyRepository.GetAllConfiguredOvertimePolicies();
    }

    public async Task<OverTimePolicy> GetAsync(int id)
    {
        return await overTimePolicyRepository.GetAsync(id);
    }

    public async Task<IEnumerable<BenefitTypes>> GetBenefitType()
    {
        return await overTimePolicyRepository.GetBenefitType();
    }

    public async Task<int> InsertAsync(OverTimePolicy overTimePolicy)
    {
        return await overTimePolicyRepository.InsertAsync(overTimePolicy);
    }

    public async Task<int> UpdateAsync(OverTimePolicy overTimePolicy)
    {
        return await overTimePolicyRepository.UpdateAsync(overTimePolicy);
    }

    public async Task<int> UpdateOverTimePolicy(int id)
    {
        return await overTimePolicyRepository.UpdateOverTimePolicy(id);
    }
}
