using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IExpenseTypeService : IAsyncService<ExpenseType>
    {

        Task<IEnumerable<int>> GetAllAssignedExpenseTypes();
        Task<IEnumerable<ExpenseType>> GetAllByExpensePolicyId(int policyId);
        Task<IEnumerable<ExpenseType>> GetAllByExpenseCategory(int expenseCategoryId);
    }
}
