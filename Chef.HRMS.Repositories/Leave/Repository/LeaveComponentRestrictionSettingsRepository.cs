using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveComponentRestrictionSettingsRepository : GenericRepository<LeaveComponentRestrictionSettings>, ILeaveComponentRestrictionSettingsRepositry
    {
        public LeaveComponentRestrictionSettingsRepository(DbSession session) : base(session)
        {
        }

        public async Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId)
        {
            using (Connection)
            {
                var sql = @"DELETE FROM hrms.leavecomponentrestrictionsettings 
                            WHERE  leavestructureid = @leaveStructureId 
                                   AND leavecomponentid = @leaveComponentId";

                return await Connection.ExecuteAsync(sql, new { leaveStructureId, leaveComponentId });
            }
        }

        public async Task<LeaveComponentRestrictionSettings> GetAsync(int leaveStructureId, int leaveComponentId)
        {
            using (Connection)
            {
                using (Connection)
                {
                    var sql = @"SELECT * 
                                FROM   hrms.leavecomponentrestrictionsettings 
                                WHERE  leavestructureid = @leaveStructureId 
                                       AND leavecomponentid = @leaveComponentId";

                    return await Connection.QueryFirstOrDefaultAsync<LeaveComponentRestrictionSettings>(sql, new { leaveStructureId, leaveComponentId });
                }
            }
        }

        public async Task<int> InsertOrUpdateAsync(LeaveComponentRestrictionSettings leaveComponentRestrictionSettings)
        {
            using (Connection)
            {
                leaveComponentRestrictionSettings.CreatedDate = leaveComponentRestrictionSettings.ModifiedDate = DateTime.UtcNow;
                leaveComponentRestrictionSettings.IsArchived = false;
                var sql = new QueryBuilder<LeaveComponentRestrictionSettings>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                sql += " ON CONFLICT ON CONSTRAINT leavecomponentrestrictionsettings_pkey DO ";
                sql += new QueryBuilder<LeaveComponentRestrictionSettings>().GenerateUpdateQueryOnConflict();

                return await Connection.ExecuteAsync(sql, leaveComponentRestrictionSettings);
            }
        }
    }
}