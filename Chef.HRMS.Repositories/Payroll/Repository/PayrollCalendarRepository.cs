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

        public async Task<IEnumerable<string>> GetStartDateAndEndDate()
        {
            //var sql = "SELECT date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '@startweek') +(CASE WHEN EXTRACT(DOW FROM date_trunc('year', CURRENT_DATE)) = 1 THEN interval '1 day' ELSE interval '0 day' END) + (interval '1 day' * (EXTRACT(DOW FROM date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '@startweek')) - 1)) AS week_start_date, date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '@endweek') + (CASE WHEN EXTRACT(DOW FROM date_trunc('year', CURRENT_DATE)) = 1 THEN interval '1 day - 1 second' ELSE interval '-1 day' END) +(interval '1 day' * (EXTRACT(DOW FROM date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '@endweek')) - 1)) AS week_end_date";
            //string sql = "SELECT date_trunc('week', date_trunc('year', CURRENT_DATE) + interval @startweek) +(CASE WHEN EXTRACT(DOW FROM date_trunc('year', CURRENT_DATE)) = 1 THEN interval '1 day' ELSE interval '0 day' END) + (interval '1 day' * (EXTRACT(DOW FROM date_trunc('week', date_trunc('year', CURRENT_DATE) + interval @startweek)) - 1)) AS week_start_date, date_trunc('week', date_trunc('year', CURRENT_DATE) + interval @endweek) + (CASE WHEN EXTRACT(DOW FROM date_trunc('year', CURRENT_DATE)) = 1 THEN interval '1 day - 1 second' ELSE interval '-1 day' END) +(interval '1 day' * (EXTRACT(DOW FROM date_trunc('week', date_trunc('year', CURRENT_DATE) + interval @endweek)) - 1)) AS week_end_date";
            //string sql = "SELECT date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '1 weeks') +(CASE WHEN EXTRACT(DOW FROM date_trunc('year', CURRENT_DATE)) = 1 THEN interval '1 day' ELSE interval '0 day' END) + (interval '1 day' * (EXTRACT(DOW FROM date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '1 weeks')) - 1)) AS week_start_date, date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '2 weeks') + (CASE WHEN EXTRACT(DOW FROM date_trunc('year', CURRENT_DATE)) = 1 THEN interval '1 day - 1 second' ELSE interval '-1 day' END) +(interval '1 day' * (EXTRACT(DOW FROM date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '2 weeks')) - 1)) AS week_end_date";
            var sql = "SELECT date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '51 weeks')+(CASE WHEN EXTRACT(DOW FROM date_trunc('year', CURRENT_DATE)) = 1 THEN interval '1 day' ELSE interval '0 day' END) + (interval '1 day' * (EXTRACT(DOW FROM date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '51 weeks')) - 1)) AS week_start_date, date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '52 weeks') + (CASE WHEN EXTRACT(DOW FROM date_trunc('year', CURRENT_DATE)) = 1 THEN interval '1 day - 1 second' ELSE interval '-3 day' END) +(interval '1 day' * (EXTRACT(DOW FROM date_trunc('week', date_trunc('year', CURRENT_DATE) + interval '52 weeks')) - 1)) AS week_end_date";

            var date=await Connection.QueryAsync<string>(sql);
            return date;
        }
    }
}

