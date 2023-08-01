using Chef.HRMS.Models.PayrollProcessing;


namespace Chef.HRMS.Repositories.PayrollProcessing.Repository;

public class TicketAccrualSummaryRepository : TenantRepository<TicketAccrualSummary>, ITicketAccrualSummaryRepository
{
    public TicketAccrualSummaryRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<TicketAccrualSummary> GetPreviousTicketAccrualSummary(int employeeId)
    {
        var sql = @"SELECT 
                       * 
                    FROM hrms.ticketaccrualsummary 
                    WHERE employeeid = @employeeId 
                    ORDER BY id DESC
                    LIMIT 1";

        return await Connection.QueryFirstOrDefaultAsync<TicketAccrualSummary>(sql, new { employeeId });
    }

}
