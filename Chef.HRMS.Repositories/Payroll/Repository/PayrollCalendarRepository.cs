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
        public PayrollCalendarRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<bool> IsDuplicateValueExists(string name)
        {
            using (Connection)
            {
                var sql = "select exists(select 1 from hrms.payrollcalendar where (lower(name))=(lower(@name)))";

                return await Connection.QueryFirstOrDefaultAsync<bool>(sql, new { name });
            }
        }
        public async Task<IEnumerable<int>> GetAllAssignedPayCalendar()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT payrollcalendarid 
                                    FROM hrms.paygroup
                                    ORDER  BY payrollcalendarid ASC";

                return await Connection.QueryAsync<int>(sql);
            }
        }
    }
}

