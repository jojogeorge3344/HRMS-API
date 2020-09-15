using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IExpensePaymentRepository : IGenericRepository<ExpensePayment>
    {
        Task<IEnumerable<ExpensePayment>> GetAllApprovedExpense();
        Task<IEnumerable<ExpensePayment>> GetAllPaidOutExpense();
        Task<int> UpdateExpenseStatus(int expenseRequestId,int paymentMode);
    }
}
