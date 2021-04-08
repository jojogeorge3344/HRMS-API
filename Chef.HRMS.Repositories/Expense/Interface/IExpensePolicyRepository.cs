using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IExpensePolicyRepository : IGenericRepository<ExpensePolicy>
    {
        Task<IEnumerable<int>> GetAllAssignedExpensePolicy();
        Task<IEnumerable<ExpensePolicy>> GetAllConfiguredExpensePolicies();
        Task<bool> UpdateExpensePolicy(int id, bool isConfigured);
    }
}
