namespace Chef.HRMS.Repositories;

public interface IExpensePolicyConfigurationRepository : IGenericRepository<ExpensePolicyConfiguration>
{
    Task<IEnumerable<ExpensePolicyConfiguration>> GetAllAsync(int expensePolicyId);
    Task<IEnumerable<ExpensePolicyConfiguration>> GetExpenseTypesById(int employeeId);
    Task<int> SetExpensePolicyIsConfigured(int expensePolicyId);
    Task<bool> IsExpensePolicyById(int expensePolicyId, int expensePolicyTypeId);
}
