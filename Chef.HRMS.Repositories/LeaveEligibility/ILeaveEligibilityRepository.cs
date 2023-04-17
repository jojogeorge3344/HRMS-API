using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILeaveEligibilityRepository : IGenericRepository<LeaveEligibility>
    {
        Task<IEnumerable<LeaveEligibility>> GetLeaveConfiguration(int id);
        Task<int> DeleteAsync(int id);
        Task<IEnumerable<BenefitTypes>> GetBenefitType();
    }
}
