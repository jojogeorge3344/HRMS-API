using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class DeferPaymentRepository : GenericRepository<DeferPayment>, IDeferPaymentRepository
    {
        public DeferPaymentRepository(DbSession session) : base(session)
        {
        }
    }
}
