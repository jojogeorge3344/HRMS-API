using Chef.Common.Core.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IBranchBankAccountService : IAsyncService<HRMSBranchBankAccount>
    {
        Task<IEnumerable<HRMSBranchBankAccount>> GetAllByBranch(int branchId);
    }
}