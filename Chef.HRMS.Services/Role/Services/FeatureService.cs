using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class FeatureService : IFeatureService
{
    private readonly IFeatureRepository featureRepository;

    public FeatureService(IFeatureRepository featureRepository)
    {
        this.featureRepository = featureRepository;
    }

    public async Task<int> DeleteAsync(int id)
    {
        return await featureRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<Feature>> GetAllAsync()
    {
        return await featureRepository.GetAllAsync();
    }

    public async Task<Feature> GetAsync(int id)
    {
        return await featureRepository.GetAsync(id);
    }

    public async Task<int> InsertAsync(Feature feature)
    {
        return await featureRepository.InsertAsync(feature);
    }

    public async Task<int> UpdateAsync(Feature feature)
    {
        return await featureRepository.UpdateAsync(feature);
    }
}