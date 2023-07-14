namespace Chef.HRMS.Repositories;

public class OverTimePolicyConfigurationRepository : GenericRepository<OverTimePolicyConfiguration>, IOverTimePolicyConfigurationRepository
{
    public OverTimePolicyConfigurationRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<int>> GetAllAssignedOverTimePolicies()
    {
        var sql = @"SELECT DISTINCT overtimepolicyid 
                                    FROM hrms.overtimepolicyconfiguration
                                    ORDER  BY overtimepolicyid ASC";

        return await Connection.QueryAsync<int>(sql);
    }

    public async Task<OverTimePolicyConfiguration> GetByOverTimePolicyId(int overTimePolicyId)
    {
        var sql = @"SELECT * 
                            FROM   hrms.overtimepolicyconfiguration 
                            WHERE  overtimepolicyid = @overTimePolicyId";

        return await Connection.QueryFirstOrDefaultAsync<OverTimePolicyConfiguration>(sql, new { overTimePolicyId });
    }

    public async Task<OverTimePolicyConfiguration> GetOvertimeConfigurationById(int employeeId)
    {
        var sql = @"SELECT * 
                            FROM   hrms.overtimepolicyconfiguration A 
                                   INNER JOIN hrms.jobfiling B 
                                           ON A.overtimepolicyid = B.overtimepolicyid 
                            WHERE  B.employeeid = @employeeId";

        return await Connection.QueryFirstOrDefaultAsync<OverTimePolicyConfiguration>(sql, new { employeeId });
    }
    public async Task<IEnumerable<BenefitTypes>> GetNormalOverTime()
    {
        //var sql = @"SELECT * FROM hrms.benefittypes
        //            WHERE isarchived=false AND id =8";

        int bt = (int)Chef.HRMS.Types.BenefitType.NormalOvertime;
        var sql = @"SELECT pc.* 
                        FROM hrms.benefittypes  as bt  
                        INNER JOIN hrms.payrollcomponent pc ON bt.id = pc.payrollcomponenttype 
                        AND pc.isarchived=false AND bt.id = " + bt + " ORDER BY pc.name";
        return await Connection.QueryAsync<BenefitTypes>(sql);
    }
    public async Task<IEnumerable<BenefitTypes>> GetHolidayOverTime()
    {
        //var sql = @"SELECT * FROM hrms.benefittypes
        //            WHERE isarchived=false AND id = 9";

        int bt = (int)Chef.HRMS.Types.BenefitType.HolidayOvertime;
        var sql = @"SELECT pc.* 
                        FROM hrms.benefittypes  as bt  
                        INNER JOIN hrms.payrollcomponent pc ON bt.id = pc.payrollcomponenttype 
                        AND pc.isarchived=false AND bt.id = " + bt + " ORDER BY pc.name";
        return await Connection.QueryAsync<BenefitTypes>(sql);
    }
    public async Task<IEnumerable<BenefitTypes>> GetSpecialOvertime()
    {
        //var sql = @"SELECT * FROM hrms.benefittypes
        //            WHERE isarchived=false AND id =10";

        int bt1 = (int)Chef.HRMS.Types.BenefitType.SpecialOvertime;
        var sql = @"SELECT pc.* 
                        FROM hrms.benefittypes  as bt  
                        INNER JOIN hrms.payrollcomponent pc ON bt.id = pc.payrollcomponenttype 
                        AND pc.isarchived=false AND bt.id = " + bt1 + " ORDER BY pc.name";
        return await Connection.QueryAsync<BenefitTypes>(sql);
    }
}
