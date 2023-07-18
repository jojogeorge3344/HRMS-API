using Chef.Common.Core.Extensions;

namespace Chef.HRMS.Repositories;

public class WPSUserRepository : GenericRepository<WPSUser>, IWPSUserRepository
{
    public WPSUserRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<WPSUser>> GetAllByemployeeId(int employeeId)
    {
        var sql = "SELECT * FROM  hrms.WPSUser WHERE employeeid = @employeeId  ORDER BY id";

        return await Connection.QueryAsync<WPSUser>(sql, new { employeeId });
    }

    public async Task<IEnumerable<HRMSBank>> GetBank()
    {
        return await QueryFactory
        .Query<HRMSBank>()
        .WhereNotArchived()
        .GetAsync<HRMSBank>();
    } 
}
