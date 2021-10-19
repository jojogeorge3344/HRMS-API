using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class PayslipConfigurationRepository : GenericRepository<PayslipConfiguration>, IPayslipConfigurationRepository
    {
        public PayslipConfigurationRepository(DbSession session) : base(session)
        {
        }
    }
}
