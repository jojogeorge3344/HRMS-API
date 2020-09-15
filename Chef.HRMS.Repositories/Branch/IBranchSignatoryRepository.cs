using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IBranchSignatoryRepository : IGenericRepository<HRMSBranchSignatory>
    {
        Task<IEnumerable<HRMSBranchSignatory>> GetAllByBranchAsync(int branchId);
    }
}