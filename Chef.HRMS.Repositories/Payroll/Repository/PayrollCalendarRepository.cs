using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayrollCalendarRepository : GenericRepository<PayrollCalendar>, IPayrollCalendarRepository
    {
        public PayrollCalendarRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<bool> IsDuplicateValueExists(string name)
        {
                var sql = "select exists(select 1 from hrms.payrollcalendar where (lower(name))=(lower(@name)))";

                return await Connection.QueryFirstOrDefaultAsync<bool>(sql, new { name });
        }
        public async Task<IEnumerable<int>> GetAllAssignedPayCalendar()
        {
                var sql = @"SELECT DISTINCT payrollcalendarid 
                                    FROM hrms.paygroup
                                    ORDER  BY payrollcalendarid ASC";

                return await Connection.QueryAsync<int>(sql);
        }
    }
}

