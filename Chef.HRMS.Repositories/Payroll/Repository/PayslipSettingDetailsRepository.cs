using Chef.Common.Core.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayslipSettingDetailsRepository : GenericRepository<PayslipSettingDetails>, IPayslipSettingDetailsRepository
    {

        public PayslipSettingDetailsRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }
        public async Task<int>DeleteByPayslipSettingId(int payslipSettingId)
        {
            return await QueryFactory
            .Query<PayslipSettingDetails>()
            .Where("payslipsettingid", payslipSettingId)
            .DeleteAsync();
        }

        public async Task<IEnumerable<PayslipSettingDetails>> GetPayslipSettingsDetailsByPayslipSettingsId(int id)
        {
            return await QueryFactory
            .Query<PayslipSettingDetails>()
            .Where("payslipsettingid", id)
            .WhereNotArchived()
            .GetAsync<PayslipSettingDetails>();
        }
    }
}
