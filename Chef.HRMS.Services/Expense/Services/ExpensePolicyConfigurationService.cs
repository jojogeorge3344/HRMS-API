using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Linq;

namespace Chef.HRMS.Services;

public class ExpensePolicyConfigurationService : AsyncService<ExpensePolicyConfiguration>, IExpensePolicyConfigurationService
{
    private readonly IExpensePolicyConfigurationRepository expensePolicyConfigurationRepository;
    private readonly ITenantSimpleUnitOfWork tenantSimpleUnitOfWork;

    public ExpensePolicyConfigurationService(
        IExpensePolicyConfigurationRepository expensePolicyConfigurationRepository,
        ITenantSimpleUnitOfWork tenantSimpleUnitOfWork)
    {
        this.expensePolicyConfigurationRepository = expensePolicyConfigurationRepository;
        this.tenantSimpleUnitOfWork = tenantSimpleUnitOfWork;
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
        tenantSimpleUnitOfWork.BeginTransaction();
        try
        {          
            List<ExpensePolicyConfiguration> configurationsDetails = new();

            var configurations = expensePolicyConfiguration.ToList();

            foreach (var expense in configurations)
            {
                bool details = await expensePolicyConfigurationRepository.IsExpensePolicyById(expense.ExpensePolicyId,expense.ExpenseTypeId);
                if(details)
                {
                    await expensePolicyConfigurationRepository.UpdateAsync(expense);
                }
                else
                {
                    await expensePolicyConfigurationRepository.InsertAsync(expense);
                }
            }
            tenantSimpleUnitOfWork.Commit();
            return 1;
        }
        catch
        {
            tenantSimpleUnitOfWork.Rollback();
            return 0;
        }
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
