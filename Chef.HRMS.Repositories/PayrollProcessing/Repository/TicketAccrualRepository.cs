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

        public async Task<IEnumerable<TicketAccrual>> GetTicketAccrualsByPayrollProcessingId(int payrollProcessingId)
        {
            var sql = @" select ta.accrualdate, ta.accrualamount, ta.accrualdate, ta.employeeid, emp.displayname
                        from hrms.ticketaccrual ta
                        left join hrms.jobfiling jf on jf.employeeid = ta.employeeid
                        left join hrms.hrmsemployee emp on emp.id = jf.employeeid
                        where ta.payrollprocessingid = @payrollProcessingId";
            return await Connection.QueryAsync<TicketAccrual>(sql, new { payrollProcessingId });
        }
    }
}
