using Chef.HRMS.Models;
using System;

namespace Chef.HRMS.Services;

public interface IExpenseService : IAsyncService<Expense>
{

    Task<ExpenseView> GetMaximumExpenseAmountById(int employeeId, int expenseConfigurationId, int expensePeriodType, DateTime currentDate);
    Task<IEnumerable<Expense>> GetAllExpenseDetailsById(int employeeId);
    Task<IEnumerable<Expense>> GetAllUnApprovedExpenseById(int employeeId);
    Task<ExpenseView> GetMaximumInstancesById(int employeeId, int expenseConfigurationId, int instancesPeriodType);
}
