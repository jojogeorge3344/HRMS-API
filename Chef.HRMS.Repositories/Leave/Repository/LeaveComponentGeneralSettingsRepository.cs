using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveComponentGeneralSettingsRepository : GenericRepository<LeaveComponentGeneralSettings>, ILeaveComponentGeneralSettingsRepository
    {
        public LeaveComponentGeneralSettingsRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId)
        {
            using (Connection)
            {
                var sql = @"DELETE FROM leavecomponentgeneralsettings 
                            WHERE  leavestructureid = @leaveStructureId 
                                   AND leavecomponentid = @leaveComponentId";

                return await Connection.ExecuteAsync(sql, new { leaveStructureId, leaveComponentId });
            }
        }

        public async Task<LeaveComponentGeneralSettings> GetAsync(int leaveStructureId, int leaveComponentId)
        {
            using (Connection)
            {
                using (Connection)
                {
                    var sql = @"SELECT * 
                                FROM   leavecomponentgeneralsettings 
                                WHERE  leavestructureid = @leaveStructureId 
                                       AND leavecomponentid = @leaveComponentId";

                    return await Connection.QueryFirstOrDefaultAsync<LeaveComponentGeneralSettings>(sql, new { leaveStructureId, leaveComponentId });
                }
            }
        }

        public async Task<int> InsertOrUpdateAsync(LeaveComponentGeneralSettings leaveComponentGeneralSettings)
        {
            using (Connection)
            {
                leaveComponentGeneralSettings.CreatedDate = leaveComponentGeneralSettings.ModifiedDate = DateTime.UtcNow;
                leaveComponentGeneralSettings.IsArchived = false;
                var sql = new QueryBuilder<LeaveComponentGeneralSettings>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                sql += " ON CONFLICT ON CONSTRAINT leavecomponentgeneralsettings_pkey DO ";
                sql += new QueryBuilder<LeaveComponentGeneralSettings>().GenerateUpdateQueryOnConflict();
                var result = await Connection.ExecuteAsync(sql, leaveComponentGeneralSettings);
                if (result != 0)
                {
                    var leaveStructureId = leaveComponentGeneralSettings.LeaveStructureId;
                    var leaveComponentId = leaveComponentGeneralSettings.LeaveComponentId;
                    var sqlnew = @"UPDATE public.leavestructureleavecomponent
	                                              SET isconfigured=true
	                                              WHERE leavestructureid=@leaveStructureId 
                                                  AND leavecomponentid=@leaveComponentId";
                    await Connection.ExecuteAsync(sqlnew, new { leaveStructureId, leaveComponentId });

                }
                return result;
            }
        }

        public async Task<int> SetLeaveStructureIsConfigured(int leaveStructureId)
        {
            using (Connection)
            {
                try
                {
                    var sql = @"SELECT public.setleavestructureisconfigured(@leaveStructureId)";
                    var result = await Connection.ExecuteAsync(sql, new { leaveStructureId });
                    if (result == -1)
                    {

                        return 1;
                    }
                    else
                    {
                        return 0;
                    }

                }
                catch (Exception ex)
                {

                    throw ex;
                }

            }
        }
    }
}