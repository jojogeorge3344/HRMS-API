namespace Chef.HRMS.Repositories;

public class LeaveDetailsRepository : GenericRepository<LeaveDetails>, ILeaveDetailsRepository
{
    public LeaveDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}
