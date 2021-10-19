using Chef.Common.Repositories;
using Chef.HRMS.Models;

namespace Chef.HRMS.Repositories
{
    public class PayrollSystemVariableRepository : GenericRepository<PayrollSystemVariable>, IPayrollSystemVariableRepository
    {
        public PayrollSystemVariableRepository(DbSession session) : base(session)
        {
        }
    }
}
