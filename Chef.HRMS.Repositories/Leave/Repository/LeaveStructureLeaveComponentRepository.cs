using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveStructureLeaveComponentRepository : GenericRepository<LeaveStructureLeaveComponent>, ILeaveStructureLeaveComponentRepository
    {
        public LeaveStructureLeaveComponentRepository(DbSession session) : base(session)
        {
        }

        public async Task<int> DeleteAsync(LeaveStructureLeaveComponent leaveStructureLeaveComponent)
        {
            using (Connection)
            {
                var sql = @"DELETE FROM leavestructureleavecomponent 
                            WHERE  leavestructureid = @LeaveStructureId 
                                   AND leavecomponentid = @LeaveComponentId";

                return await Connection.ExecuteAsync(sql, new
                {
                    leaveStructureLeaveComponent.LeaveStructureId,
                    leaveStructureLeaveComponent.LeaveComponentId
                });
            }
        }

        public async Task<IEnumerable<LeaveStructureLeaveComponent>> GetAllAsync(int leaveStructureId)
        {
            using (Connection)
            {
                var sql = @"SELECT * 
                            FROM   leavestructureleavecomponent 
                            WHERE  leavestructureid = @leaveStructureId";

                return await Connection.QueryAsync<LeaveStructureLeaveComponent>(sql, new { leaveStructureId });
            }
        }

        public async Task<int> UpdateAsync(int leaveStructureId, IEnumerable<LeaveStructureLeaveComponent> leaveStructureLeaveComponents)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<LeaveStructureLeaveComponent>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                sql += " ON CONFLICT ON CONSTRAINT leavestructureleavecomponent_pkey DO NOTHING";
                await Connection.ExecuteAsync(sql, leaveStructureLeaveComponents);

                if (leaveStructureLeaveComponents.Count() > 0)
                {
                    string leaveComponentIds = string.Join(",", leaveStructureLeaveComponents.ToList().Select(l => l.LeaveComponentId).ToArray());
                    sql = "DELETE FROM leavestructureleavecomponent WHERE leavestructureid = @leaveStructureId AND leavecomponentid NOT IN (" + leaveComponentIds + ")";
                }
                else
                {
                    sql = "DELETE FROM leavestructureleavecomponent WHERE leavestructureid = @leaveStructureId";
                }

                return await Connection.ExecuteAsync(sql, new { leaveStructureId });
            }
        }

        public async Task<int> InsertAsync(int leaveStructureId, IEnumerable<LeaveStructureLeaveComponent> leaveStructureLeaveComponents, IEnumerable<LeaveStructureLeaveComponent> removeLeaveStructureLeaveComponents)
        {
            using (Connection)
            {
                try
                {
                    if (leaveStructureLeaveComponents.Count() > 0)
                    {
                        var sql = new QueryBuilder<LeaveStructureLeaveComponent>().GenerateInsertQuery();
                        sql = sql.Replace("RETURNING id", "");
                        sql += " ON CONFLICT ON CONSTRAINT leavestructureleavecomponent_pkey DO NOTHING";
                        await Connection.ExecuteAsync(sql, leaveStructureLeaveComponents);
                        var sqlnew = @"UPDATE public.leavestructure
	                                              SET isconfigured=false
	                                              WHERE id=@leaveStructureId";
                        await Connection.ExecuteAsync(sqlnew, new { leaveStructureId });
                    }
                    if (removeLeaveStructureLeaveComponents.Count() > 0)
                    {
                        string leaveComponentIds = string.Join(",", removeLeaveStructureLeaveComponents.ToList().Select(l => l.LeaveComponentId).ToArray());
                        var sql = @"DELETE FROM leavestructureleavecomponent WHERE leavestructureid = @leaveStructureId AND leavecomponentid IN (" + leaveComponentIds + ");DELETE FROM leavecomponentgeneralsettings WHERE leavestructureid = @leaveStructureId AND leavecomponentid IN (" + leaveComponentIds + ");DELETE FROM leavecomponentrestrictionsettings WHERE leavestructureid = @leaveStructureId AND leavecomponentid IN (" + leaveComponentIds + ");";
                        await Connection.ExecuteAsync(sql, new { leaveStructureId });
                    }

                    return 0;
                }
                catch (System.Exception)
                {
                    return -1;
                }
            }
        }


    }
}