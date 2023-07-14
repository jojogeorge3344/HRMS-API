namespace Chef.HRMS.Repositories;

public class LeaveDocumentRepository : GenericRepository<LeaveDocument>, ILeaveDocumentRepository
{
    public LeaveDocumentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
}