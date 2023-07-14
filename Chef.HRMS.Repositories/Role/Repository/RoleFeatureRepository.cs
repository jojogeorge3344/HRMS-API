namespace Chef.HRMS.Repositories;

public class RoleFeatureRepository : GenericRepository<RoleFeature>, IRoleFeatureRepository
{
    public RoleFeatureRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<int> AssignRoleFeature(IEnumerable<RoleFeature> roleFeature)
    {
        var sql = new QueryBuilder<RoleFeature>().GenerateInsertQuery();
        sql = sql.Replace("RETURNING id", "");
        return await Connection.ExecuteAsync(sql, roleFeature);
    }
}