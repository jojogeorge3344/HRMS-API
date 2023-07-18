using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class LOPCalculationService : AsyncService<LOPCalculation>, ILOPCalculationService
{
    private readonly ILOPCalculationRepository lopCalculationRepository;

    public LOPCalculationService(ILOPCalculationRepository lopCalculationRepository)
    {
        this.lopCalculationRepository = lopCalculationRepository;
    }
}
