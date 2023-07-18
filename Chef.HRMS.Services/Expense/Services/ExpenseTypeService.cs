using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class ExpenseTypeService : AsyncService<ExpenseType>, IExpenseTypeService
{
    private readonly IExpenseTypeRepository expenseTypeRepository;

    public ExpenseTypeService(IExpenseTypeRepository expenseTypeRepository)
    {
        this.expenseTypeRepository = expenseTypeRepository;
    }

    public async Task<IEnumerable<ExpenseType>> GetAllByExpensePolicyId(int policyId)
    {
        return await expenseTypeRepository.GetAllByExpensePolicyId(policyId);
    }

    public async Task<IEnumerable<int>> GetAllAssignedExpenseTypes()
    {
        return await expenseTypeRepository.GetAllAssignedExpenseTypes();
    }

    public async Task<IEnumerable<ExpenseType>> GetAllByExpenseCategory(int expenseCategoryId)
    {
        return await expenseTypeRepository.GetAllByExpenseCategory(expenseCategoryId);
    }
}