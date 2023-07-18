using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class ExpensePaymentService : AsyncService<ExpensePayment>, IExpensePaymentService
{
    private readonly IExpensePaymentRepository expensePaymentRepository;

    public ExpensePaymentService(IExpensePaymentRepository expensePaymentRepository)
    {
        this.expensePaymentRepository = expensePaymentRepository;
    } 

    public async Task<IEnumerable<ExpensePayment>> GetAllApprovedExpense()
    {
        return await expensePaymentRepository.GetAllApprovedExpense();
    }

    public async Task<IEnumerable<ExpensePayment>> GetAllPaidOutExpense()
    {
        return await expensePaymentRepository.GetAllPaidOutExpense();

    }

    public async Task<int> UpdateExpenseStatus(int expenseRequestId, int paymentMode)
    {
        return await expensePaymentRepository.UpdateExpenseStatus(expenseRequestId, paymentMode);
    }
}
