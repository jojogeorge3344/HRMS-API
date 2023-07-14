using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IExpenseTypeService : IAsyncService<ExpenseType>
{

    Task<IEnumerable<int>> GetAllAssignedExpenseTypes();
    Task<IEnumerable<ExpenseType>> GetAllByExpensePolicyId(int policyId);
    Task<IEnumerable<ExpenseType>> GetAllByExpenseCategory(int expenseCategoryId);
}
