using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IOverTimePolicySlabService : IAsyncService<OverTimeSlab>
{
    Task<bool> IsOverTimePolicyCodeExist(string code);
    Task<IEnumerable<BenefitTypes>> GetOverTimeBenefitTypes();
    Task<IEnumerable<OverTimeSlab>> GetOverTimeComponentDetails(int overtimepolicyid);
}
