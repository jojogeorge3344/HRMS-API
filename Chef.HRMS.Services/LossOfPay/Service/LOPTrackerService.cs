using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class LOPTrackerService : AsyncService<LOPTracker>, ILOPTrackerService
{
    private readonly ILOPTrackerRepository lopTrackerRepository;

    public LOPTrackerService(ILOPTrackerRepository lopTrackerRepository)
    {
        this.lopTrackerRepository = lopTrackerRepository;
    }

    public async Task<LossOfPayView> GetLossOfPayDeductionByEmployee(int employeeId, int payrollProcessingMethodId)
    {
        return await lopTrackerRepository.GetLossOfPayDeductionByEmployee(employeeId, payrollProcessingMethodId);
    }
}
