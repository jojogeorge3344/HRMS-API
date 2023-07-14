using Chef.Common.Core.Extensions;
using Chef.HRMS.Models.Payroll;

namespace Chef.HRMS.Repositories.Payroll;

public class PayslipSettingReposirory : GenericRepository<PayslipSetting>, IPayslipSettingReposirory
{
    public PayslipSettingReposirory(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<PayrollStructure>> GetAllPayrollStructure()
    {
        var sql = @"SELECT DISTINCT
                          ps.id,
                          ps.name,
                          ps.description
                        FROM hrms.payrollcomponentconfiguration pcc
                        INNER JOIN hrms.payrollstructure ps
                          ON pcc.payrollstructureid = ps.id
                        WHERE ps.isarchived = FALSE";

        return await Connection.QueryAsync<PayrollStructure>(sql);
    }

    public async Task<IEnumerable<PayslipSettingList>> GetAllPayslipSettings()
    {
        var sql = @"SELECT
                          pss.*,
                          prs.name AS payrollstructurename
                        FROM hrms.payslipsetting pss
                        INNER JOIN hrms.payrollstructure prs
                          ON pss.structureid = prs.id
                        WHERE pss.isarchived = FALSE";

        return await Connection.QueryAsync<PayslipSettingList>(sql);
    }

    public async Task<IEnumerable<PayrollComponent>> GetComponentsByStructureId(int structureId)
    {
        var sql = @"SELECT
                          id,
                          shortcode,
                          name
                        FROM hrms.payrollcomponentconfiguration
                        WHERE payrollstructureid = @structureId
                        AND isarchived = FALSE";

        return await Connection.QueryAsync<PayrollComponent>(sql, new { structureId });
    }

    public async Task<bool> IsPayslipSettingCodeExist(string code)
    {
        if (await QueryFactory
       .Query<PayslipSetting>()
      .Where("code", code)
      .WhereNotArchived()
      .CountAsync<int>() > 0) return true;
        else return false;
    }
}
