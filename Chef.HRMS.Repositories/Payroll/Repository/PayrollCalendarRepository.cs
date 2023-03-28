using Chef.Common.Core.Extensions;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualBasic;
using StackExchange.Redis;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Xml.Linq;

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

        public async Task<IEnumerable<WeekofDateList>> GetStartDateAndEndDate(string weekstart, string weekend)
        {
            string sql = string.Format("SELECT date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '{0}') " +
                            "+(CASE WHEN EXTRACT(DOW FROM date_trunc('year', CURRENT_DATE)) = 1 " +
                            "THEN interval '1 day' ELSE interval '1 day' END) " +
                            "+(interval '1 day' * (EXTRACT(DOW FROM date_trunc('week', date_trunc('year', CURRENT_DATE) " +
                            "+ interval '{0}')) - 1)) AS weekstartdate, date_trunc('week', date_trunc('year', CURRENT_DATE) " +
                            "+ interval '{1}') + (CASE WHEN EXTRACT(DOW FROM date_trunc('year', CURRENT_DATE)) = 1 " +
                            "THEN interval '1 day - 1 second' ELSE interval '-2 day' END) " +
                            "+(interval '1 day' * (EXTRACT(DOW FROM date_trunc('week', date_trunc('year', CURRENT_DATE) " +
                            "+ interval '{1}')) - 1)) AS weekenddate", weekstart, weekend);

            var data= await Connection.QueryAsync<WeekofDateList>(sql);
            return data;
        }

        public async Task<IEnumerable<WeekOff>> GetWeekOff()
        {
            return await QueryFactory
          .Query<WeekOff>()
          .WhereNotArchived()
          .GetAsync<WeekOff>();
        }
    }
}

