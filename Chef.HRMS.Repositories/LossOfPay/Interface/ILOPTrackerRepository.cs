namespace Chef.HRMS.Repositories;

public interface ILOPTrackerRepository : IGenericRepository<LOPTracker>
{
    Task<LossOfPayView> GetLossOfPayDeductionByEmployee(int employeeId, int payrollProcessingMethodId);
}