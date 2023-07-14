using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface ILOPTrackerService : IAsyncService<LOPTracker>
{
    Task<LossOfPayView> GetLossOfPayDeductionByEmployee(int employeeId, int payrollProcessingMethodId);
}
