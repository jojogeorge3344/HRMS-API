using Chef.Common.Core.Extensions;

namespace Chef.HRMS.Repositories;

public class LeaveSlabRepository : TenantRepository<LeaveSlab>, ILeaveSlabRepository
{
    public LeaveSlabRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }

    public async Task<IEnumerable<LeaveSlab>> GetLeaveComponentDetails(int leavecomponentid)
    {
        return await QueryFactory
            .Query<LeaveSlab>()
            .Where("leavecomponentid", leavecomponentid)
            .WhereNotArchived()
            .OrderBy("id")
            .GetAsync<LeaveSlab>();
    }
}
