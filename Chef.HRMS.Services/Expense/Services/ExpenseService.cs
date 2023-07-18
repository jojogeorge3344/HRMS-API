using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;

namespace Chef.HRMS.Services;

public class ExpenseService : AsyncService<Expense>, IExpenseService
{
    private readonly IExpenseRepository expenseRepository;

    public ExpenseService(IExpenseRepository ExpenseRepository)
    {
        this.expenseRepository = ExpenseRepository;
    }

    public async Task<IEnumerable<Expense>> GetAllExpenseDetailsById(int employeeId)
    {
        return await expenseRepository.GetAllExpenseDetailsById(employeeId);
    }

    public async Task<IEnumerable<Expense>> GetAllUnApprovedExpenseById(int employeeId)
    {
        return await expenseRepository.GetAllUnApprovedExpenseById(employeeId);
    }

    public async Task<ExpenseView> GetMaximumExpenseAmountById(int employeeId, int expenseConfigurationId, int expensePeriodType, DateTime currentDate)
    {
        return await expenseRepository.GetMaximumExpenseAmountById(employeeId, expenseConfigurationId, expensePeriodType, currentDate);
    }

    public async Task<ExpenseView> GetMaximumInstancesById(int employeeId, int expenseConfigurationId, int instancesPeriodType)
    {
        return await expenseRepository.GetMaximumInstancesById(employeeId, expenseConfigurationId, instancesPeriodType);
    }
}
