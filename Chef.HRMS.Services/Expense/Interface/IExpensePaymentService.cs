using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IExpensePaymentService : IAsyncService<ExpensePayment>
{
    Task<IEnumerable<ExpensePayment>> GetAllApprovedExpense();
    Task<int> UpdateExpenseStatus(int expenseRequestId, int paymentMode);
    Task<IEnumerable<ExpensePayment>> GetAllPaidOutExpense();
}
