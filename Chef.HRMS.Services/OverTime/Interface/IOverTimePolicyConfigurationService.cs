using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IOverTimePolicyConfigurationService : IAsyncService<OverTimePolicyConfiguration>
{
    Task<IEnumerable<int>> GetAllAssignedOverTimePolicies();
    Task<OverTimePolicyConfiguration> GetByOverTimePolicyId(int overTimePolicyId);
    Task<OverTimePolicyConfiguration> GetOvertimeConfigurationById(int employeeId);
    Task<IEnumerable<BenefitTypes>> GetNormalOverTime();
    Task<IEnumerable<BenefitTypes>> GetHolidayOverTime();
    Task<IEnumerable<BenefitTypes>> GetSpecialOvertime();
}
