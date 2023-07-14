using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class RoleFeatureService : IRoleFeatureService
{
    private readonly IRoleFeatureRepository roleFeatureRepository;

    public RoleFeatureService(IRoleFeatureRepository roleFeatureRepository)
    {
        this.roleFeatureRepository = roleFeatureRepository;
    }

    public async Task<int> AssignRoleFeature(IEnumerable<RoleFeature> roleFeature)
    {
        return await roleFeatureRepository.AssignRoleFeature(roleFeature);
    }

    public async Task<int> DeleteAsync(int id)
    {
        return await roleFeatureRepository.DeleteAsync(id);
    }

    public async Task<IEnumerable<RoleFeature>> GetAllAsync()
    {
        return await roleFeatureRepository.GetAllAsync();
    }

    public async Task<RoleFeature> GetAsync(int id)
    {
        return await roleFeatureRepository.GetAsync(id);
    }

    public async Task<int> InsertAsync(RoleFeature roleFeature)
    {
        return await roleFeatureRepository.InsertAsync(roleFeature);
    }

    public async Task<int> UpdateAsync(RoleFeature roleFeature)
    {
        return await roleFeatureRepository.UpdateAsync(roleFeature);
    }
}