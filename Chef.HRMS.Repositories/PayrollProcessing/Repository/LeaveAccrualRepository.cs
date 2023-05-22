using Chef.HRMS.Models.PayrollProcessing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Chef.HRMS.Repositories.PayrollProcessing.Repository
{
    public class LeaveAccrualRepository : TenantRepository<LeaveAccrual>, ILeaveAccrualRepository
    {
        public LeaveAccrualRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<LeaveAccrual> GenerateLeaveAccruals(int employeeId, DateTime fromDate, DateTime toDate)
        {
            var sql = @"";

            return await Connection.<LeaveAccrual>(sql, new { employeeId, fromDate, toDate });
        }
    }
}
