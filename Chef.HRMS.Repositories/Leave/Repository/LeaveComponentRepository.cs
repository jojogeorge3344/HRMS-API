using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveComponentRepository : GenericRepository<LeaveComponent>, ILeaveComponentRepository
    {
        public LeaveComponentRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }
        public async Task<IEnumerable<int>> GetAllAssignedLeaveComponents()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT leavecomponentid 
                                    FROM PUBLIC.leavestructureleavecomponent
                                    ORDER  BY leavecomponentid ASC";

                return await Connection.QueryAsync<int>(sql);
            }
        }
        public async Task<IEnumerable<LeaveComponent>> GetAllByLeaveStructure(int leaveStructureId)
        {
            using (Connection)
            {
                using (Connection)
                {
                    var sql = @"SELECT LC.* 
                                FROM   leavecomponent LC 
                                       INNER JOIN leavestructureleavecomponent LSLC 
                                               ON LC.id = LSLC.leavecomponentid 
                                WHERE  LSLC.leavestructureid = @leaveStructureId";

                    return await Connection.QueryAsync<LeaveComponent>(sql, new { leaveStructureId });
                }
            }
        }
    }
}