namespace Chef.HRMS.Repositories;

public interface IExpenseRepository : IGenericRepository<Expense>
{
    Task<IEnumerable<Expense>> GetAllExpenseDetailsById(int employeeId);
    Task<IEnumerable<Expense>> GetAllUnApprovedExpenseById(int employeeId);
    Task<ExpenseView> GetMaximumExpenseAmountById(int employeeId, int expenseConfigurationId, int expensePeriodType, DateTime currentDate);
    Task<ExpenseView> GetMaximumInstancesById(int employeeId, int expenseConfigurationId, int instancesPeriodType);
}
