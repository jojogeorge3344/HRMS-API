namespace Chef.HRMS.Repositories;

public interface IRoleFeatureRepository : IGenericRepository<RoleFeature>
{
    Task<int> AssignRoleFeature(IEnumerable<RoleFeature> roleFeature);
}