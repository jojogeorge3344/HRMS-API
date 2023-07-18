using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class ExpensePolicyService : AsyncService<ExpensePolicy>, IExpensePolicyService
{
    private readonly IExpensePolicyRepository expensePolicyRepository;

    public ExpensePolicyService(IExpensePolicyRepository ExpensePolicyRepository)
    {
        this.expensePolicyRepository = ExpensePolicyRepository;
    }

    public async Task<IEnumerable<int>> GetAllAssignedExpensePolicy()
    {
        return await expensePolicyRepository.GetAllAssignedExpensePolicy();
    }


    public async Task<IEnumerable<ExpensePolicy>> GetAllConfiguredExpensePolicies()
    {
        return await expensePolicyRepository.GetAllConfiguredExpensePolicies();
    }

    public async Task<bool> UpdateExpensePolicy(int id, bool isConfigured)
    {
        return await expensePolicyRepository.UpdateExpensePolicy(id, isConfigured);
    }
}
