using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveStructureRepository : GenericRepository<LeaveStructure>, ILeaveStructureRepository
    {
        public LeaveStructureRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<int>> GetAllAssignedLeaveStructure()
        {
            using (Connection)
            {
                var sql = @"SELECT DISTINCT leavestructureid 
                                    FROM PUBLIC.jobfiling
                                    ORDER  BY leavestructureid ASC";

                return await Connection.QueryAsync<int>(sql);
            }
        }

        public async Task<IEnumerable<LeaveStructure>> GetAllConfiguredLeaveStructures()
        {
            using (Connection)
            {
                var sql = @"SELECT * 
                                    FROM PUBLIC.leavestructure
                                    WHERE isconfigured=true";

                return await Connection.QueryAsync<LeaveStructure>(sql);
            }
        }

        public async Task<int> UpdateLeaveStructure(int id, bool isConfigured)
        {
            using (Connection)
            {
                var sql = @"UPDATE PUBLIC.leavestructure
                                   SET isconfigured=true
                                    WHERE id=@id";

                return await Connection.ExecuteAsync(sql, new { id });
            }
        }
    }
}