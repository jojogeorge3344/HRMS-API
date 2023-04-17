using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class PayslipConfigurationRepository : GenericRepository<PayslipConfiguration>, IPayslipConfigurationRepository
    {
        public PayslipConfigurationRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }
    }
}
