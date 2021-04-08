using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IExpensePolicyConfigurationService : IAsyncService<ExpensePolicyConfiguration>
    {
        Task<int> InsertAsync(IEnumerable<ExpensePolicyConfiguration> expensePolicyConfiguration, IEnumerable<int> expensePolicyConfigurationIds);
        Task<IEnumerable<ExpensePolicyConfiguration>> GetAllAsync(int expensePolicyId);

        Task<IEnumerable<ExpensePolicyConfiguration>> GetExpenseTypesById(int employeeId);
    }
}
