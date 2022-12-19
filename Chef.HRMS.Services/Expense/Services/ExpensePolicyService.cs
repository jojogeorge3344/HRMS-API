using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class ExpensePolicyService : AsyncService<ExpensePolicy>, IExpensePolicyService
    {
        private readonly IExpensePolicyRepository expensePolicyRepository;

        public ExpensePolicyService(IExpensePolicyRepository ExpensePolicyRepository)
        {
            this.expensePolicyRepository = ExpensePolicyRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await expensePolicyRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<int>> GetAllAssignedExpensePolicy()
        {
            return await expensePolicyRepository.GetAllAssignedExpensePolicy();
        }

        public async Task<IEnumerable<ExpensePolicy>> GetAllAsync()
        {
            return await expensePolicyRepository.GetAllAsync();
        }

        public async Task<IEnumerable<ExpensePolicy>> GetAllConfiguredExpensePolicies()
        {
            return await expensePolicyRepository.GetAllConfiguredExpensePolicies();
        }

        public async Task<ExpensePolicy> GetAsync(int id)
        {
            return await expensePolicyRepository.GetAsync(id);
        }


        public async Task<int> InsertAsync(ExpensePolicy expensePolicy)
        {
            return await expensePolicyRepository.InsertAsync(expensePolicy);
        }

        public async Task<int> UpdateAsync(ExpensePolicy expensePolicy)
        {
            return await expensePolicyRepository.UpdateAsync(expensePolicy);
        }

        public async Task<bool> UpdateExpensePolicy(int id, bool isConfigured)
        {
            return await expensePolicyRepository.UpdateExpensePolicy(id, isConfigured);
        }
    }
}
