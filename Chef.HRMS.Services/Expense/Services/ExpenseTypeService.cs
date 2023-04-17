using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class ExpenseTypeService : AsyncService<ExpenseType>, IExpenseTypeService
    {
        private readonly IExpenseTypeRepository expenseTypeRepository;

        public ExpenseTypeService(IExpenseTypeRepository expenseTypeRepository)
        {
            this.expenseTypeRepository = expenseTypeRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await expenseTypeRepository.DeleteAsync(id);
        }


        public async Task<IEnumerable<ExpenseType>> GetAllByExpensePolicyId(int policyId)
        {
            return await expenseTypeRepository.GetAllByExpensePolicyId(policyId);
        }

        public async Task<IEnumerable<int>> GetAllAssignedExpenseTypes()
        {
            return await expenseTypeRepository.GetAllAssignedExpenseTypes();
        }

        public async Task<IEnumerable<ExpenseType>> GetAllAsync()
        {
            return await expenseTypeRepository.GetAllAsync();
        }

        public async Task<ExpenseType> GetAsync(int id)
        {
            return await expenseTypeRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(ExpenseType expenseType)
        {
            return await expenseTypeRepository.InsertAsync(expenseType);
        }

        public async Task<int> UpdateAsync(ExpenseType expenseType)
        {
            return await expenseTypeRepository.UpdateAsync(expenseType);
        }

        public async Task<IEnumerable<ExpenseType>> GetAllByExpenseCategory(int expenseCategoryId)
        {
            return await expenseTypeRepository.GetAllByExpenseCategory(expenseCategoryId);
        }
    }
}