using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IExpenseService : IAsyncService<Expense>
    {

        Task<ExpenseView> GetMaximumExpenseAmountById(int employeeId, int expenseConfigurationId, int expensePeriodType,DateTime currentDate);
        Task<IEnumerable<Expense>> GetAllExpenseDetailsById(int employeeId);
        Task<IEnumerable<Expense>> GetAllUnApprovedExpenseById(int employeeId);
        Task<ExpenseView> GetMaximumInstancesById(int employeeId, int expenseConfigurationId, int instancesPeriodType);
    }
}
