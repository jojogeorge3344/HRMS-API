using Chef.Common.Core.Extensions;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.Payroll
{
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

        public async Task<IEnumerable<PayslipSetting>> GetAllPayslipSettingsDetails()
        {
            var sql = @"SELECT
                          ps.*,
                          psr.name AS structurename
                        FROM hrms.payslipsetting ps
                        INNER JOIN hrms.payrollstructure psr
                          ON ps.structureid = psr.id
                        WHERE ps.isarchived = FALSE";

            return await Connection.QueryAsync<PayslipSetting>(sql);
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
}
