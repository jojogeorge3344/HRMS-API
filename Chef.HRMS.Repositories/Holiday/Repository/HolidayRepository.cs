using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class HolidayRepository : GenericRepository<Holiday>, IHolidayRepository
    {
        public HolidayRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<Holiday>> GetAllByCategory(int categoryId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  holiday WHERE holidaycategoryid = @categoryId ORDER BY id";

                return await Connection.QueryAsync<Holiday>(sql, new { categoryId });
            }
        }

        public async Task<IEnumerable<DateTime>> GetAllHolidaysByEmployee(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT date::date 
                            FROM holiday h
                                 INNER JOIN jobfiling jf
                                         ON h.holidaycategoryid = jf.holidaycategoryid
                                              AND jf.employeeid = @employeeid
                            WHERE Date_part('year', date) = Date_part('year', CURRENT_TIMESTAMP) ";

                return await Connection.QueryAsync<DateTime>(sql, new { employeeId });
            }
        }
    }
}