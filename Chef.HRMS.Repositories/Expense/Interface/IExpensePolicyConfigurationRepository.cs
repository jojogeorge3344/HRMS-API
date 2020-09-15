using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IExpensePolicyConfigurationRepository : IGenericRepository<ExpensePolicyConfiguration>
    {
        Task<int> InsertAsync(IEnumerable<ExpensePolicyConfiguration> expensePolicyConfiguration, IEnumerable<int> expensePolicyConfigurationIds);
        Task<IEnumerable<ExpensePolicyConfiguration>> GetAllAsync(int expensePolicyId);
        Task<IEnumerable<ExpensePolicyConfiguration>> GetExpenseTypesById(int employeeId);
        Task<int> SetExpensePolicyIsConfigured(int expensePolicyId);


    }
}
