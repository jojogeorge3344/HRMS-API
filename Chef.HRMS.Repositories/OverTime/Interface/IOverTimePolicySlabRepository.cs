namespace Chef.HRMS.Repositories;

public interface IOverTimePolicySlabRepository : IGenericRepository<OverTimeSlab>
{
    Task<bool> IsOverTimePolicyCodeExist(string code);
    Task<IEnumerable<BenefitTypes>> GetOverTimeBenefitTypes();
    Task<IEnumerable<OverTimeSlab>> GetOverTimeComponentDetails(int overtimepolicyid);

}
