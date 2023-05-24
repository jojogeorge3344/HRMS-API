using Chef.Common.Models;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Chef.HRMS.Repositories.PayrollProcessing.Repository
{
    public class LeaveAccrualSummaryRepository : TenantRepository<LeaveAccrualSummary>, ILeaveAccrualSummaryRepository
    {
        public LeaveAccrualSummaryRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<LeaveAccrualSummary> GetPreviousAccrualSummary(int employeeId, int day, int month, int year)
        {
            var sql = @"select * from hrms.leaveaccrualsummary 
                        where employeeid = @employeeId 
                        and EXTRACT(DAY FROM accrualdate) = @day
                        and EXTRACT(MONTH FROM accrualdate) = @month
                        and EXTRACT(YEAR FROM accrualdate) = @year
                        order by id desc";
            return await Connection.QueryFirstOrDefaultAsync<LeaveAccrualSummary>(sql, new { employeeId, day,month,year });
        }

    }
}
