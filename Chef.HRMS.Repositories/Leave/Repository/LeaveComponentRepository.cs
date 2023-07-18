using Chef.HRMS.Models.BenefitCategory;

namespace Chef.HRMS.Repositories;

public class LeaveComponentRepository : GenericRepository<LeaveComponent>, ILeaveComponentRepository
{
    public LeaveComponentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }
    public async Task<IEnumerable<int>> GetAllAssignedLeaveComponents()
    {
        var sql = @"SELECT DISTINCT leavecomponentid 
                                    FROM hrms.leavestructureleavecomponent
                                    ORDER  BY leavecomponentid ASC";

        return await Connection.QueryAsync<int>(sql);
    }
    public async Task<IEnumerable<LeaveComponent>> GetAllByLeaveStructure(int leaveStructureId)
    {
        var sql = @"SELECT LC.* 
                                FROM   hrms.leavecomponent LC 
                                       INNER JOIN hrms.leavestructureleavecomponent LSLC 
                                               ON LC.id = LSLC.leavecomponentid 
                                WHERE  LSLC.leavestructureid = @leaveStructureId";

        return await Connection.QueryAsync<LeaveComponent>(sql, new { leaveStructureId });
    }

    public async Task<IEnumerable<BenefitCategory>> GetBenefitCategory()
    {
        var sql = @"SELECT * FROM hrms.benefitcategory
                        WHERE isarchived=false AND id IN (1,2,3)";

        return await Connection.QueryAsync<BenefitCategory>(sql);
    }

    public async Task<IEnumerable<BenefitTypes>> GetAccrualBenefitType()
    {
        //var sql = @"SELECT * FROM hrms.benefittypes WHERE id=15";

        int bt = (int)Chef.HRMS.Types.BenefitType.EmployeeLeaveEncashment;
        var sql = @"SELECT pc.* 
                        FROM hrms.benefittypes  as bt  
                        INNER JOIN hrms.payrollcomponent pc ON bt.id = pc.payrollcomponenttype 
                        AND pc.isarchived=false AND bt.id = " + bt + " ORDER BY pc.name";
        return await Connection.QueryAsync<BenefitTypes>(sql);
    }

    public async Task<IEnumerable<BenefitTypes>> GetAccrualType()
    {
        //var sql = @"SELECT * FROM hrms.benefittypes WHERE id=32";

        int bt = (int)Chef.HRMS.Types.BenefitType.EmployeeAnnualLeave;
        var sql = @"SELECT pc.* 
                        FROM hrms.benefittypes  as bt  
                        INNER JOIN hrms.payrollcomponent pc ON bt.id = pc.payrollcomponenttype 
                        AND pc.isarchived=false AND bt.id = " + bt + " ORDER BY pc.name";
        return await Connection.QueryAsync<BenefitTypes>(sql);
    }

    public async Task<IEnumerable<BenefitTypes>> GetDeductionType()
    {
        //var sql = @"SELECT * FROM hrms.benefittypes WHERE id=36";

        int bt = (int)Chef.HRMS.Types.BenefitType.EmployeeLossofPayLeaves;
        var sql = @"SELECT pc.* 
                        FROM hrms.benefittypes  as bt  
                        INNER JOIN hrms.payrollcomponent pc ON bt.id = pc.payrollcomponenttype 
                        AND pc.isarchived=false AND bt.id = " + bt + " ORDER BY pc.name";
        return await Connection.QueryAsync<BenefitTypes>(sql);
    }
    public new async Task<IEnumerable<LeaveComponent>> GetAllAsync()
    {
        var sql = @"SELECT * FROM hrms.leavecomponent WHERE isarchived = false ORDER BY name ASC";

        return await Connection.QueryAsync<LeaveComponent>(sql);
    }
    public async Task<IEnumerable<BenefitTypes>> GetBenefitType(int categoryid)
    {
        string sql = string.Empty;
        if (categoryid == 1)
        {
            //sql = @"select*from hrms.benefittypes where id=15";

            int bt = (int)Chef.HRMS.Types.BenefitType.EmployeeLeaveEncashment;
            sql = @"select * from hrms.benefittypes where id= " + bt;
        }
        else if (categoryid == 2)
        {
            //sql = @"select*from hrms.benefittypes where id=36";

            int bt = (int)Chef.HRMS.Types.BenefitType.EmployeeLossofPayLeaves;
            sql = @"select * from hrms.benefittypes where id= " + bt;

        }
        else
        {
            //sql = @"select*from hrms.benefittypes where id=32";

            int bt = (int)Chef.HRMS.Types.BenefitType.EmployeeAnnualLeave;
            sql = @"select * from hrms.benefittypes where id= " + bt;

        }
        var data = await Connection.QueryAsync<BenefitTypes>(sql, new { categoryid });
        return data;
    }
}