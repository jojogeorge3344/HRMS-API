using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class ShiftRepository : GenericRepository<Shift>, IShiftRepository
    {
        public ShiftRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<int>> GetAllAssignedShift()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT shiftid 
                                    FROM PUBLIC.jobfiling
                                    ORDER  BY shiftid ASC";

                return await Connection.QueryAsync<int>(sql);
            }
        }

        public async Task<Shift> GetShiftByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT s.id, 
                                   s.NAME, 
                                   s.starttime, 
                                   s.endtime, 
                                   s.breakduration, 
                                   s.numberofdays 
                            FROM   shift s 
                                   INNER JOIN jobfiling jb 
                                           ON s.id = jb.shiftid AND jb.employeeid = @employeeid ";

                return await Connection.QueryFirstAsync<Shift>(sql, new { employeeId });
            }
        }
    }
}
