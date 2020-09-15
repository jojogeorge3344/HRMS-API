using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILOPTrackerRepository : IGenericRepository<LOPTracker>
    {
        Task<LossOfPayView> GetLossOfPayDeductionByEmployee(int employeeId, int payrollProcessingMethodId);
    }
}