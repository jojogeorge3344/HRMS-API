using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
   public class ExpenseService : AsyncService, IExpenseService
    {
        private readonly IExpenseRepository expenseRepository;

        public ExpenseService(IExpenseRepository ExpenseRepository)
        {
            this.expenseRepository = ExpenseRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await expenseRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Expense>> GetAllAsync()
        {
            return await expenseRepository.GetAllAsync();
        }

        public async Task<IEnumerable<Expense>> GetAllExpenseDetailsById(int employeeId)
        {
            return await expenseRepository.GetAllExpenseDetailsById(employeeId);
        }

        public async Task<IEnumerable<Expense>> GetAllUnApprovedExpenseById(int employeeId)
        {
            return await expenseRepository.GetAllUnApprovedExpenseById(employeeId);
        }

        public async Task<Expense> GetAsync(int id)
        {
            return await expenseRepository.GetAsync(id);
        }

        public async Task<ExpenseView> GetMaximumExpenseAmountById(int employeeId, int expenseConfigurationId, int expensePeriodType,DateTime currentDate)
        {
            return await expenseRepository.GetMaximumExpenseAmountById(employeeId, expenseConfigurationId, expensePeriodType,currentDate);
        }

        public async Task<ExpenseView> GetMaximumInstancesById(int employeeId, int expenseConfigurationId, int instancesPeriodType)
        {
            return await expenseRepository.GetMaximumInstancesById(employeeId, expenseConfigurationId, instancesPeriodType);
        }

        public async Task<Expense> InsertAsync(Expense expense)
        {
            return await expenseRepository.InsertAsync(expense);
        }

        public async Task<int> UpdateAsync(Expense expense)
        {
            return await expenseRepository.UpdateAsync(expense);
        }
    }
}
