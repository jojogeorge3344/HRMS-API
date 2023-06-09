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


    }
}
