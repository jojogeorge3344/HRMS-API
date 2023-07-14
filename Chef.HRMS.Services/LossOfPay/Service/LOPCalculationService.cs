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

    public async Task<int> DeleteAsync(int id)
    {
        return await lopCalculationRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<LOPCalculation>> GetAllAsync()
    {
        return await lopCalculationRepository.GetAllAsync();
    }

    public async Task<LOPCalculation> GetAsync(int id)
    {
        return await lopCalculationRepository.GetAsync(id);
    }

    public async Task<int> InsertAsync(LOPCalculation lopCalculation)
    {
        return await lopCalculationRepository.InsertAsync(lopCalculation);
    }

    public async Task<int> UpdateAsync(LOPCalculation lopCalculation)
    {
        return await lopCalculationRepository.UpdateAsync(lopCalculation);
    }
}
