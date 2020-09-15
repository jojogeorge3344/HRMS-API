using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IExpensePolicyService : IAsyncService<ExpensePolicy>
    {
        Task<IEnumerable<int>> GetAllAssignedExpensePolicy();
        Task<IEnumerable<ExpensePolicy>> GetAllConfiguredExpensePolicies();
        Task<bool> UpdateExpensePolicy(int id,bool isConfigured);
    }
}
