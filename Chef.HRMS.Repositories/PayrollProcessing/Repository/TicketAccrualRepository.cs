using Chef.HRMS.Models.PayrollProcessing;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Chef.HRMS.Repositories.PayrollProcessing.Repository
{
    public class TicketAccrualRepository : TenantRepository<TicketAccrual>, ITicketAccrualRepository
    {
        public TicketAccrualRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        //public async Task<LeaveAccrual> GenerateLeaveAccruals(int employeeId, DateTime fromDate, DateTime toDate)
        //{
        //    var sql = @"";

        //    return await Connection.ExecuteAsync<LeaveAccrual>(sql, new { employeeId, fromDate, toDate });
        //}
    }
}
