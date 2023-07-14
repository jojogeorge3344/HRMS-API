namespace Chef.HRMS.Repositories;

public class LeaveStructureLeaveComponentRepository : GenericRepository<LeaveStructureLeaveComponent>, ILeaveStructureLeaveComponentRepository
{
    public LeaveStructureLeaveComponentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<int> DeleteAsync(LeaveStructureLeaveComponent leaveStructureLeaveComponent)
    {
        var sql = @"DELETE FROM hrms.leavestructureleavecomponent 
                            WHERE  leavestructureid = @LeaveStructureId 
                                   AND leavecomponentid = @LeaveComponentId";

        return await Connection.ExecuteAsync(sql, new
        {
            leaveStructureLeaveComponent.LeaveStructureId,
            leaveStructureLeaveComponent.LeaveComponentId
        });
    }

    public async Task<IEnumerable<LeaveStructureLeaveComponent>> GetAllAsync(int leaveStructureId)
    {
        var sql = @"SELECT lslc.*,le.eligibledays,le.maxleaveatatime,le.eligibilitybase,le.iscarryforward,le.maxleaveatatime,le.cflimitdays
                            FROM   hrms.leavestructureleavecomponent lslc
							INNER JOIN hrms.leaveeligibility le
							ON le.leavecomponentid=lslc.leavecomponentid
                            WHERE  leavestructureid = @leaveStructureId";

        return await Connection.QueryAsync<LeaveStructureLeaveComponent>(sql, new { leaveStructureId });
    }

    public async Task<int> UpdateAsync(int leaveStructureId, IEnumerable<LeaveStructureLeaveComponent> leaveStructureLeaveComponents)
    {
        int result = 0;

        using (var transaction = Connection.BeginTransaction())
        {
            try
            {
                var sql = new QueryBuilder<LeaveStructureLeaveComponent>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING Id", " ");
                sql += " ON CONFLICT ON CONSTRAINT leavestructureleavecomponent_pkey DO NOTHING";
                await Connection.ExecuteAsync(sql, leaveStructureLeaveComponents);

                if (leaveStructureLeaveComponents.Count() > 0)
                {
                    string leaveComponentIds = string.Join(",", leaveStructureLeaveComponents.ToList().Select(l => l.LeaveComponentId).ToArray());
                    sql = "DELETE FROM hrms.leavestructureleavecomponent WHERE leavestructureid = @leaveStructureId AND leavecomponentid NOT IN (" + leaveComponentIds + ")";
                }
                else
                {
                    sql = "DELETE FROM hrms.leavestructureleavecomponent WHERE leavestructureid = @leaveStructureId";
                }

                await Connection.ExecuteAsync(sql, new { leaveStructureId });
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

    public async Task<int> InsertAsync(int leaveStructureId, IEnumerable<LeaveStructureLeaveComponent> leaveStructureLeaveComponents, IEnumerable<LeaveStructureLeaveComponent> removeLeaveStructureLeaveComponents)
    {
        int result = 0;

        using (var transaction = Connection.BeginTransaction())
        {
            try
            {
                if (leaveStructureLeaveComponents.Count() > 0)
                {
                    var sql = new QueryBuilder<LeaveStructureLeaveComponent>().GenerateInsertQuery();
                    sql = sql.Replace("RETURNING Id", "");
                    sql += "ON CONFLICT ON CONSTRAINT leavestructureleavecomponent_pkey DO NOTHING";
                    await Connection.ExecuteAsync(sql, leaveStructureLeaveComponents);
                    var sqlnew = @"UPDATE hrms.leavestructure
	                                              SET isconfigured=false
	                                              WHERE id=@leaveStructureId";
                    await Connection.ExecuteAsync(sqlnew, new { leaveStructureId });
                }
                if (removeLeaveStructureLeaveComponents.Count() > 0)
                {
                    string leaveComponentIds = string.Join(",", removeLeaveStructureLeaveComponents.ToList().Select(l => l.LeaveComponentId).ToArray());
                    var sql = @"DELETE FROM hrms.leavestructureleavecomponent WHERE leavestructureid = @leaveStructureId AND leavecomponentid IN (" + leaveComponentIds + ");DELETE FROM leavecomponentgeneralsettings WHERE leavestructureid = @leaveStructureId AND leavecomponentid IN (" + leaveComponentIds + ");DELETE FROM leavecomponentrestrictionsettings WHERE leavestructureid = @leaveStructureId AND leavecomponentid IN (" + leaveComponentIds + ");";
                    await Connection.ExecuteAsync(sql, new { leaveStructureId });
                }
                transaction.Commit();
                //return 0;
            }
            catch (System.Exception ex)
            {
                string msg = ex.Message;
                transaction.Rollback();
                //return -1;
            }
        }
        return result;
    }


}