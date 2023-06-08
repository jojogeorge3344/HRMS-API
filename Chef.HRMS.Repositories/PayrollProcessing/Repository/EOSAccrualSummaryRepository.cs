using Chef.Common.Models;
using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using StackExchange.Redis;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Chef.HRMS.Repositories.PayrollProcessing.Repository
{
    public class EOSAccrualSummaryRepository : TenantRepository<EOSAccrualSummary>, IEOSAccrualSummaryRepository
    {
        public EOSAccrualSummaryRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<EOSAccrualSummary> GetPreviousEOSAccrualSummary(int employeeId)
        {
            var sql = @"select * from hrms.eosaccrualsummary 
                        where employeeid = @employeeId 
                        order by id desc
                        limit 1";

            return await Connection.QueryFirstOrDefaultAsync<EOSAccrualSummary>(sql, new { employeeId });
        }

    }
}
