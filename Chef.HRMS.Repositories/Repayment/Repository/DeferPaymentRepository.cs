using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Microsoft.AspNetCore.Http;

namespace Chef.HRMS.Repositories
{
    public class DeferPaymentRepository : GenericRepository<DeferPayment>, IDeferPaymentRepository
    {
        public DeferPaymentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }
    }
}
