using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class ExpensePolicyConfigurationService : AsyncService<ExpensePolicyConfiguration>, IExpensePolicyConfigurationService
{
    private readonly IExpensePolicyConfigurationRepository expensePolicyConfigurationRepository;

    public ExpensePolicyConfigurationService(IExpensePolicyConfigurationRepository expensePolicyConfigurationRepository)
    {
        this.expensePolicyConfigurationRepository = expensePolicyConfigurationRepository;
    }

    public async Task<IEnumerable<ExpensePolicyConfiguration>> GetAllAsync(int expensePolicyId)
    {
        return await expensePolicyConfigurationRepository.GetAllAsync(expensePolicyId);
    }

    public async Task<IEnumerable<ExpensePolicyConfiguration>> GetExpenseTypesById(int employeeId)
    {
        return await expensePolicyConfigurationRepository.GetExpenseTypesById(employeeId);
    } 

    public async Task<int> InsertAsync(IEnumerable<ExpensePolicyConfiguration> expensePolicyConfiguration, IEnumerable<int> expensePolicyConfigurationIds)
    {
        return await expensePolicyConfigurationRepository.InsertAsync(expensePolicyConfiguration, expensePolicyConfigurationIds);
    }

    public new async Task<int> UpdateAsync(ExpensePolicyConfiguration expensePolicyConfiguration)
    {
        int data = await expensePolicyConfigurationRepository.UpdateAsync(expensePolicyConfiguration);
        if (data == 1)
        {
            var expensePolicyId = expensePolicyConfiguration.ExpensePolicyId;
            data = await expensePolicyConfigurationRepository.SetExpensePolicyIsConfigured(expensePolicyId);
        }
        return data;
    }
}
