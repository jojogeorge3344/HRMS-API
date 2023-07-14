namespace Chef.HRMS.Repositories;

public interface ILeaveEligibilityRepository : IGenericRepository<LeaveEligibility>
{
    Task<IEnumerable<LeaveEligibility>> GetLeaveConfiguration(int id);
    Task<int> DeleteAsync(int id);
    Task<IEnumerable<BenefitTypes>> GetBenefitType();
}
