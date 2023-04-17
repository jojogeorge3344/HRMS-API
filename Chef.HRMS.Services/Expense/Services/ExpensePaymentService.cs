using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class ExpensePaymentService : AsyncService<ExpensePayment>, IExpensePaymentService
    {
        private readonly IExpensePaymentRepository expensePaymentRepository;

        public ExpensePaymentService(IExpensePaymentRepository expensePaymentRepository)
        {
            this.expensePaymentRepository = expensePaymentRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await expensePaymentRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<ExpensePayment>> GetAllApprovedExpense()
        {
            return await expensePaymentRepository.GetAllApprovedExpense();
        }

        public async Task<IEnumerable<ExpensePayment>> GetAllAsync()
        {
            return await expensePaymentRepository.GetAllAsync();
        }

        public async Task<IEnumerable<ExpensePayment>> GetAllPaidOutExpense()
        {
            return await expensePaymentRepository.GetAllPaidOutExpense();

        }

        public async Task<ExpensePayment> GetAsync(int id)
        {
            return await expensePaymentRepository.GetAsync(id);
        }


        public async Task<int> InsertAsync(ExpensePayment expensePayment)
        {
            return await expensePaymentRepository.InsertAsync(expensePayment);
        }

        public async Task<int> UpdateAsync(ExpensePayment expensePayment)
        {
            return await expensePaymentRepository.UpdateAsync(expensePayment);
        }

        public async Task<int> UpdateExpenseStatus(int expenseRequestId, int paymentMode)
        {
            return await expensePaymentRepository.UpdateExpenseStatus(expenseRequestId, paymentMode);
        }
    }
}
