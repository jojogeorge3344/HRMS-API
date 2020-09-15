using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IExpenseTypeRepository : IGenericRepository<ExpenseType>
    {
        Task<IEnumerable<int>> GetAllAssignedExpenseTypes();
        Task<IEnumerable<ExpenseType>> GetAllByExpensePolicyId(int policyId);
        Task<IEnumerable<ExpenseType>> GetAllByExpenseCategory(int expenseCategoryId);
    }
}
