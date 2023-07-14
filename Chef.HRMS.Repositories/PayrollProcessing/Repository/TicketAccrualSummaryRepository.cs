﻿using Chef.HRMS.Models.PayrollProcessing;


namespace Chef.HRMS.Repositories.PayrollProcessing.Repository;

public class TicketAccrualSummaryRepository : TenantRepository<TicketAccrualSummary>, ITicketAccrualSummaryRepository
{
    public TicketAccrualSummaryRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<TicketAccrualSummary> GetPreviousTicketAccrualSummary(int employeeId)
    {
        var sql = @"select * from hrms.ticketaccrualsummary 
                        where employeeid = @employeeId 
                        order by id desc
                        limit 1";

        return await Connection.QueryFirstOrDefaultAsync<TicketAccrualSummary>(sql, new { employeeId });
    }

}
