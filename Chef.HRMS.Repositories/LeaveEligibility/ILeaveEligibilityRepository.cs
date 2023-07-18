namespace Chef.HRMS.Repositories;

public interface ILeaveEligibilityRepository : IGenericRepository<LeaveEligibility>
{
    new Task<int> DeleteAsync(int id);

    Task<IEnumerable<LeaveEligibility>> GetLeaveConfiguration(int id);

    Task<IEnumerable<BenefitTypes>> GetBenefitType();
}
