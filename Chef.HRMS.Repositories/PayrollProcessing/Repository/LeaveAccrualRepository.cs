using Chef.HRMS.Models.PayrollProcessing;
using Dapper;
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

        public async Task<IEnumerable<LeaveAccrual>> GetProcessedLeaveAccruals(DateTime accrualDate)
        {
            var sql = @"select * from hrms.leaveaccrual where leaveaccrual.accrualstatus = 1 and accrualdate = @accrualDate";
            return await Connection.QueryAsync<LeaveAccrual>(sql, new {accrualDate });
        }
    }
}
