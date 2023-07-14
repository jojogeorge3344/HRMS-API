namespace Chef.HRMS.Repositories;

public interface IOverTimePolicyRepository : IGenericRepository<OverTimePolicy>
{
    Task<IEnumerable<int>> GetAllAssignedOverTimePolicy();
    Task<IEnumerable<OverTimePolicy>> GetAllAssignedOverTimePolicyCount();
    Task<IEnumerable<OverTimePolicy>> GetAllConfiguredOvertimePolicies();
    Task<int> UpdateOverTimePolicy(int id);
    Task<IEnumerable<BenefitTypes>> GetBenefitType();

}
