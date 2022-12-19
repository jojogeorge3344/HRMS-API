using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveComponentRestrictionSettingsRepository : GenericRepository<LeaveComponentRestrictionSettings>, ILeaveComponentRestrictionSettingsRepositry
    {
        public LeaveComponentRestrictionSettingsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId)
        {
                var sql = @"DELETE FROM hrms.leavecomponentrestrictionsettings 
                            WHERE  leavestructureid = @leaveStructureId 
                                   AND leavecomponentid = @leaveComponentId";

                return await Connection.ExecuteAsync(sql, new { leaveStructureId, leaveComponentId });
        }

        public async Task<LeaveComponentRestrictionSettings> GetAsync(int leaveStructureId, int leaveComponentId)
        {
                    var sql = @"SELECT * 
                                FROM   hrms.leavecomponentrestrictionsettings 
                                WHERE  leavestructureid = @leaveStructureId 
                                       AND leavecomponentid = @leaveComponentId";

                    return await Connection.QueryFirstOrDefaultAsync<LeaveComponentRestrictionSettings>(sql, new { leaveStructureId, leaveComponentId });
        }

        public async Task<int> InsertOrUpdateAsync(LeaveComponentRestrictionSettings leaveComponentRestrictionSettings)
        {
            int result = 0;
            using (var transaction = Connection.BeginTransaction())
            {
                try
                {
                    leaveComponentRestrictionSettings.CreatedDate = leaveComponentRestrictionSettings.ModifiedDate = DateTime.UtcNow;
                    leaveComponentRestrictionSettings.IsArchived = false;
                    var sql = new QueryBuilder<LeaveComponentRestrictionSettings>().GenerateInsertQuery();
                    sql = sql.Replace("RETURNING Id", " ");
                    sql += "ON CONFLICT ON CONSTRAINT leavecomponentrestrictionsettings_pkey DO ";
                    sql += new QueryBuilder<LeaveComponentRestrictionSettings>().GenerateUpdateQueryOnConflict();

                    await Connection.ExecuteAsync(sql, leaveComponentRestrictionSettings);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    string msg = ex.Message;
                    transaction.Rollback();
                }
            }
            return result;
        }
    }
}