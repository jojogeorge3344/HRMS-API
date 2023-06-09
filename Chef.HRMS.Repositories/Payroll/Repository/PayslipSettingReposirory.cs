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

        public async Task<IEnumerable<PayrollComponent>> GetComponentsByStructureId(int structureId)
        {
            var sql = @"SELECT name,shortcode 
                        FROM hrms.payrollcomponentconfiguration
                        WHERE payrollstructureid = @structureId
                        AND isarchived = false";

            return await Connection.QueryAsync<PayrollComponent>(sql, new { structureId });
        }
    }
}
