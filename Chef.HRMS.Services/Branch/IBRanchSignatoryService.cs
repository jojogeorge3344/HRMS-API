using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IBranchSignatoryService : IAsyncService<HRMSBranchSignatory>
    {
        Task<IEnumerable<HRMSBranchSignatory>> GetAllByBranch(int branchId);
    }
}