using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class HolidayRepository : GenericRepository<Holiday>, IHolidayRepository
    {
        public HolidayRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<Holiday>> GetAllByCategory(int categoryId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  hrms.holiday WHERE holidaycategoryid = @categoryId ORDER BY id";

                return await Connection.QueryAsync<Holiday>(sql, new { categoryId });
            }
        }

        public async Task<IEnumerable<DateTime>> GetAllHolidaysByEmployee(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT date::date 
                            FROM hrms.holiday h
                                 INNER JOIN hrms.jobfiling jf
                                         ON h.holidaycategoryid = jf.holidaycategoryid
                                              AND jf.employeeid = @employeeid
                            WHERE Date_part('year', date) = Date_part('year', CURRENT_TIMESTAMP) ";

                return await Connection.QueryAsync<DateTime>(sql, new { employeeId });
            }
        }
    }
}