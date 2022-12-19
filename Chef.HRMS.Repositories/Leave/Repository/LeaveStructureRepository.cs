using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveStructureRepository : GenericRepository<LeaveStructure>, ILeaveStructureRepository
    {
        public LeaveStructureRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<int>> GetAllAssignedLeaveStructure()
        {
                var sql = @"SELECT DISTINCT leavestructureid 
                                    FROM hrms.jobfiling
                                    ORDER  BY leavestructureid ASC";

                return await Connection.QueryAsync<int>(sql);
        }

        public async Task<IEnumerable<LeaveStructure>> GetAllConfiguredLeaveStructures()
        {
                var sql = @"SELECT * 
                                    FROM hrms.leavestructure
                                    WHERE isconfigured=true";

                return await Connection.QueryAsync<LeaveStructure>(sql);
        }

        public async Task<int> UpdateLeaveStructure(int id, bool isConfigured)
        {
                var sql = @"UPDATE hrms.leavestructure
                                   SET isconfigured=true
                                    WHERE id=@id";

                return await Connection.ExecuteAsync(sql, new { id });
        }
    }
}