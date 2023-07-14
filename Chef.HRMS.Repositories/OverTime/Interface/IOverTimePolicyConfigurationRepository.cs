namespace Chef.HRMS.Repositories;

public interface IOverTimePolicyConfigurationRepository : IGenericRepository<OverTimePolicyConfiguration>
{
    Task<IEnumerable<int>> GetAllAssignedOverTimePolicies();
    Task<OverTimePolicyConfiguration> GetByOverTimePolicyId(int overTimePolicyId);
    Task<OverTimePolicyConfiguration> GetOvertimeConfigurationById(int employeeId);
    Task<IEnumerable<BenefitTypes>> GetNormalOverTime();
    Task<IEnumerable<BenefitTypes>> GetHolidayOverTime();
    Task<IEnumerable<BenefitTypes>> GetSpecialOvertime();
}
