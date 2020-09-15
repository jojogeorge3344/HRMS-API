using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IBranchBankAccountRepository : IGenericRepository<HRMSBranchBankAccount>
    {
        Task<IEnumerable<HRMSBranchBankAccount>> GetAllByBranchAsync(int branchId);
    }
}