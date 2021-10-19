using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class HolidayCategoryRepository : GenericRepository<HolidayCategory>, IHolidayCategoryRepository
    {
        public HolidayCategoryRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<int>> GetAllAssignedHolidayCategory()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT holidaycategoryid 
                                    FROM PUBLIC.jobfiling
                                    ORDER  BY holidaycategoryid ASC";

                return await Connection.QueryAsync<int>(sql);
            }
        }

        public async Task<bool> UpdateHolidayCategory(int id, bool isConfigured)
        {
            using (Connection)
            {
                var sql = @"UPDATE PUBLIC.holidaycategory
                                   SET isconfigured=@isConfigured
                                    WHERE id=@id";

                var result = await Connection.ExecuteAsync(sql, new { id, isConfigured });
                if (result == 1)
                {
                    return true;

                }
                else
                {
                    return false;
                }
            }
        }
    }
}