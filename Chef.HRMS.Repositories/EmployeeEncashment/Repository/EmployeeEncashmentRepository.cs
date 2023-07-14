using Chef.Common.Core.Extensions;

namespace Chef.HRMS.Repositories;

public class EmployeeEncashmentRepository : TenantRepository<Chef.HRMS.Models.EmployeeEncashment>, IEmployeeEncashmentRepository
{
    public EmployeeEncashmentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {

    }

    public async Task<decimal> GetFinalLeaveBalance(DateTime fromDate, DateTime toDate, int employeeId)
    {
        var sql = @"SELECT (SELECT
                            SUM(accrualdays)
                          FROM hrms.leaveaccrualsummary
                          WHERE employeeid = @employeeId GROUP BY id ORDER BY id DESC LIMIT 1)
                          - (SELECT
                            SUM(availdays)
                          FROM hrms.leaveaccrualsummary
                          WHERE employeeid = @employeeId GROUP BY id ORDER BY id DESC LIMIT 1)
                          AS balanceannualleaves";

        return await Connection.QueryFirstOrDefaultAsync<decimal>(sql, new { fromDate, toDate, employeeId });
    }

    public async Task<decimal> GetEOSBalanceDays(DateTime fromDate, DateTime toDate, int employeeId)
    {
        var sql = @"SELECT
                          accrualdays
                        FROM hrms.eosaccrualsummary
                        WHERE accrualdate BETWEEN @fromDate AND @toDate
                        AND employeeid = @employeeId
                        ORDER BY id DESC LIMIT 1";

        return await Connection.QueryFirstOrDefaultAsync<decimal>(sql, new { fromDate, toDate, employeeId });
    }

    public async Task<decimal> GetFinalTicketAmountBalance(DateTime fromDate, DateTime toDate, int employeeId)
    {
        var sql = @"SELECT 
                          accrualamount
                        FROM hrms.ticketaccrualsummary
                        WHERE accrualdate BETWEEN @fromDate AND @toDate
                        AND employeeid = @employeeId
                        ORDER BY id DESC LIMIT 1";

        return await Connection.QueryFirstOrDefaultAsync<decimal>(sql, new { fromDate, toDate, employeeId });
    }

    public async Task<EmployeeEncashmentComponentView> GetLeaveDetailsByEmployeeId(int employeeId)
    {
        var sql = @"SELECT
                          lc.id AS leavecomponentid,
                          lc.code AS leavecomponentcode,
                          lc.name AS leavecomponentname,
                          (SELECT 
                              SUM(accrualdays)
                           FROM hrms.leaveaccrualsummary
                           WHERE employeeid = @employeeId
                           GROUP BY id
                           ORDER BY id DESC
                           LIMIT 1) - 
                          (SELECT 
                              SUM(availamount)
                           FROM hrms.leaveaccrualsummary
                           WHERE employeeid = @employeeId
                           GROUP BY id
                           ORDER BY id DESC
                           LIMIT 1) AS leavebalanceamount
                        FROM hrms.leaveaccrualsummary las
                        INNER JOIN hrms.leave l ON las.leaveid = l.id
                        INNER JOIN hrms.leavecomponent lc ON l.leavecomponentid = lc.id
                        WHERE las.employeeid = @employeeId
                          AND l.isarchived = false
                        ORDER BY las.id DESC
                        LIMIT 1";

        return await Connection.QueryFirstOrDefaultAsync<EmployeeEncashmentComponentView>(sql, new { employeeId });
    }

    public async Task<EmployeeEncashmentComponentView> GetEOSDetailsByEmployeeId(int employeeId)
    {
        var sql = @"SELECT 
                           jf.eosid, 
                           eos.bfcode AS eoscode,
                           eos.bfname AS eosname,
                           (SELECT accrualamount
                            FROM hrms.eosaccrualsummary
                            WHERE employeeid = @employeeId
                            ORDER BY id DESC
                            LIMIT 1) AS accrualamount
                        FROM hrms.hrmsemployee e
                        INNER JOIN hrms.jobfiling jf 
                           ON e.id = jf.employeeid
                        INNER JOIN hrms.endofservice eos 
                           ON jf.eosid = eos.id
                        WHERE jf.employeeid = @employeeId";

        return await Connection.QueryFirstOrDefaultAsync<EmployeeEncashmentComponentView>(sql, new { employeeId });
    }

    public async Task<EmployeeEncashmentComponentView> GetTicketDetailsByEmployeeId(int employeeId)
    {
        var sql = @"SELECT
                          pc.id AS ticketcomponentid,
                          pc.shortcode AS TicketComponentCode,
                          pc.name AS TicketComponentName,
                          escd.monthlyamount AS TicketBalanceAmount
                        FROM hrms.employeesalaryconfigurationdetails escd
                        INNER JOIN hrms.payrollcomponent pc
                          ON pc.id = escd.payrollcomponentid
                        INNER JOIN hrms.benefittypes bt
                          ON pc.payrollcomponenttype = bt.id
                        WHERE escd.employeeid = @employeeId
                        AND bt.code = 'ETA'
                        AND escd.isarchived = FALSE";

        return await Connection.QueryFirstOrDefaultAsync<EmployeeEncashmentComponentView>(sql, new { employeeId });
    }

    public async Task<IEnumerable<Chef.HRMS.Models.EmployeeEncashment>> GetEmployeeEncashmentList()
    {
        var sql = @"SELECT
                          ee.*,
                          CONCAT(e.firstname, ' ', e.middlename, ' ', e.lastname) AS employeename
                        FROM hrms.employeeencashment ee
                        INNER JOIN hrms.hrmsemployee e
                          ON ee.employeeid = e.id
                        WHERE ee.isarchived = FALSE";

        return await Connection.QueryAsync<Chef.HRMS.Models.EmployeeEncashment>(sql);
    }

    public async Task<int> UpadteEncashmentProcessStatus(int id, int approveStatus)
    {
        return await QueryFactory
             .Query<Chef.HRMS.Models.EmployeeEncashment>()
             .Where("id", id)
             .UpdateAsync(new
             {
                 processstatus = approveStatus
             });
    }
}
