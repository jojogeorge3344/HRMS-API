using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IExpensePolicyService : IAsyncService<ExpensePolicy>
{
    Task<IEnumerable<int>> GetAllAssignedExpensePolicy();
    Task<IEnumerable<ExpensePolicy>> GetAllConfiguredExpensePolicies();
    Task<bool> UpdateExpensePolicy(int id, bool isConfigured);
}
