using Chef.HRMS.Models.PayrollProcessing;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Chef.HRMS.Repositories.PayrollProcessing.Repository
{
    public class EOSAccrualRepository : TenantRepository<EOSAccrual>, IEOSAccrualRepository
    {
        public EOSAccrualRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<EOSAccrual>> GetProcessedEOSAccruals(DateTime accrualDate)
        {
            var sql = @"select * from hrms.leaveaccrual where eosaccrual.accrualstatus = 1 and accrualdate = @accrualDate";
            return await Connection.QueryAsync<EOSAccrual>(sql, new { accrualDate });
        }


        public async Task<IEnumerable<EOSAccrual>> GetEOSAccrualsByPayrollProcessingId(int payrollProcessingId)
        {
            var sql = @" select eosa.accrualdays, eosa.accrualamount, eosa.accrualdate, eosa.employeeid, emp.displayname
                        from hrms.eosaccrual eosa
                        left join hrms.jobfiling jf on jf.employeeid = eosa.employeeid
                        left join hrms.hrmsemployee emp on emp.id = jf.employeeid
                        where eosa.payrollprocessingid = @payrollProcessingId";
            return await Connection.QueryAsync<EOSAccrual>(sql, new { payrollProcessingId });
        }
    }
}
