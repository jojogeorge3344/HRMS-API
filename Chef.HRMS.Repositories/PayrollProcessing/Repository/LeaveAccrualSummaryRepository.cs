using Chef.Common.Models;
using Chef.HRMS.Models;
using StackExchange.Redis;
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

        public async Task<LeaveAccrualSummary> GetPreviousAccrualSummary(int employeeId)
        {
            var sql = @"SELECT * FROM hrms.leaveaccrualsummary 
                        WHERE employeeid = @employeeId
                        AND isarchived = FALSE
                        ORDER BY id DESC
                        LIMIT 1";

            return await Connection.QueryFirstOrDefaultAsync<LeaveAccrualSummary>(sql, new { employeeId});
        }

    }
}
