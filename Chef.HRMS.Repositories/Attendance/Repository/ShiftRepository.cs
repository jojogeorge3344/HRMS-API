using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class ShiftRepository : GenericRepository<Shift>, IShiftRepository
    {
        public ShiftRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<int>> GetAllAssignedShift()
        {

                var sql = @"SELECT DISTINCT shiftid 
                                    FROM hrms.jobfiling
                                    ORDER  BY shiftid ASC";

                return await Connection.QueryAsync<int>(sql);
        }

        public async Task<Shift> GetShiftByEmployeeId(int employeeId)
        {

                var sql = @"SELECT s.id, 
                                   s.NAME, 
                                   s.starttime, 
                                   s.endtime, 
                                   s.breakduration, 
                                   s.numberofdays 
                            FROM   hrms.shift s 
                                   INNER JOIN hrms.jobfiling jb 
                                           ON s.id = jb.shiftid AND jb.employeeid = @employeeid ";

                return await Connection.QueryFirstAsync<Shift>(sql, new { employeeId });
        }
    }
}
