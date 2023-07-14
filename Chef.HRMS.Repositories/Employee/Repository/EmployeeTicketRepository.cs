using Chef.Common.Core.Extensions;

namespace Chef.HRMS.Repositories;

public class EmployeeTicketRepository : GenericRepository<EmployeeTicket>, IEmployeeTicketRepository
{
    public EmployeeTicketRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<EmployeeTicket>> GetTicketDetailsByEmployeeId(int employeeId)
    {
        return await QueryFactory
        .Query<EmployeeTicket>()
        .Where("employeeid", @employeeId)
        .WhereNotArchived()
        .GetAsync<EmployeeTicket>();
    }

    public async Task<bool> IsTravelFromExist(string fromPlace)
    {
        if (await QueryFactory
        .Query<EmployeeTicket>()
       .Where("travelfrom", fromPlace)
       .WhereNotArchived()
       .CountAsync<int>() > 0) return true;
        else return false;
    }
}