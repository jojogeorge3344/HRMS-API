namespace Chef.HRMS.Repositories;

public class LeaveComponentGeneralSettingsRepository : GenericRepository<LeaveComponentGeneralSettings>, ILeaveComponentGeneralSettingsRepository
{
    public LeaveComponentGeneralSettingsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<int> DeleteAsync(int leaveStructureId, int leaveComponentId)
    {
        var sql = @"DELETE FROM hrms.leavecomponentgeneralsettings 
                            WHERE  leavestructureid = @leaveStructureId 
                                   AND leavecomponentid = @leaveComponentId";

        return await Connection.ExecuteAsync(sql, new { leaveStructureId, leaveComponentId });
    }

    public async Task<LeaveComponentGeneralSettings> GetAsync(int leaveStructureId, int leaveComponentId)
    {
        var sql = @"SELECT * 
                                FROM   hrms.leavecomponentgeneralsettings 
                                WHERE  leavestructureid = @leaveStructureId 
                                       AND leavecomponentid = @leaveComponentId";

        return await Connection.QueryFirstOrDefaultAsync<LeaveComponentGeneralSettings>(sql, new { leaveStructureId, leaveComponentId });
    }

    public async Task<int> InsertOrUpdateAsync(LeaveComponentGeneralSettings leaveComponentGeneralSettings)
    {
        int result = 0;

        using (var transaction = Connection.BeginTransaction())
        {
            try
            {

                leaveComponentGeneralSettings.CreatedDate = leaveComponentGeneralSettings.ModifiedDate = DateTime.UtcNow;
                leaveComponentGeneralSettings.IsArchived = false;
                var sql = new QueryBuilder<LeaveComponentGeneralSettings>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING Id", " ");
                sql += " ON CONFLICT ON CONSTRAINT leavecomponentgeneralsettings_pkey DO ";
                sql += new QueryBuilder<LeaveComponentGeneralSettings>().GenerateUpdateQueryOnConflict();
                result = await Connection.ExecuteAsync(sql, leaveComponentGeneralSettings);
                if (result != 0)
                {
                    var leaveStructureId = leaveComponentGeneralSettings.LeaveStructureId;
                    var leaveComponentId = leaveComponentGeneralSettings.LeaveComponentId;
                    var sqlnew = @"UPDATE hrms.leavestructureleavecomponent
	                                              SET isconfigured=true
	                                              WHERE leavestructureid=@leaveStructureId 
                                                  AND leavecomponentid=@leaveComponentId";
                    await Connection.ExecuteAsync(sqlnew, new { leaveStructureId, leaveComponentId });

                }
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

    public async Task<int> SetLeaveStructureIsConfigured(int leaveStructureId)
    {
        try
        {
            var sql = @"SELECT hrms.setleavestructureisconfigured(@leaveStructureId)";
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
        catch
        {
            throw;
        }
    }
}