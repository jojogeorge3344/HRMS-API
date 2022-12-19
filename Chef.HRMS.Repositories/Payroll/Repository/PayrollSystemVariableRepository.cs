using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class PayrollSystemVariableRepository : GenericRepository<PayrollSystemVariable>, IPayrollSystemVariableRepository
    {
        public PayrollSystemVariableRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }
    }
}
