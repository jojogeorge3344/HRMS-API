using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveComponentRepository : GenericRepository<LeaveComponent>, ILeaveComponentRepository
    {
        public LeaveComponentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }
        public async Task<IEnumerable<int>> GetAllAssignedLeaveComponents()
        {
                var sql = @"SELECT DISTINCT leavecomponentid 
                                    FROM hrms.leavestructureleavecomponent
                                    ORDER  BY leavecomponentid ASC";

                return await Connection.QueryAsync<int>(sql);
        }
        public async Task<IEnumerable<LeaveComponent>> GetAllByLeaveStructure(int leaveStructureId)
        {
                    var sql = @"SELECT LC.* 
                                FROM   hrms.leavecomponent LC 
                                       INNER JOIN hrms.leavestructureleavecomponent LSLC 
                                               ON LC.id = LSLC.leavecomponentid 
                                WHERE  LSLC.leavestructureid = @leaveStructureId";

                    return await Connection.QueryAsync<LeaveComponent>(sql, new { leaveStructureId });
        }
    }
}