namespace Chef.HRMS.Repositories;

public interface IExpensePaymentRepository : IGenericRepository<ExpensePayment>
{
    Task<IEnumerable<ExpensePayment>> GetAllApprovedExpense();
    Task<IEnumerable<ExpensePayment>> GetAllPaidOutExpense();
    Task<int> UpdateExpenseStatus(int expenseRequestId, int paymentMode);
}
