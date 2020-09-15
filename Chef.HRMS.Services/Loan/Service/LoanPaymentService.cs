using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LoanPaymentService : AsyncService, ILoanPaymentService
    {
        private readonly ILoanPaymentRepository loanPaymentRepository;

        public LoanPaymentService(ILoanPaymentRepository loanPaymentRepository)
        {
            this.loanPaymentRepository = loanPaymentRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await loanPaymentRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<LoanPayment>> GetAllAsync()
        {
            return await loanPaymentRepository.GetAllAsync();
        }

        public async Task<IEnumerable<EmployeeLoanView>> GetAllLoanPaymentByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            return await loanPaymentRepository.GetAllLoanPaymentByEmployeeId(employeeId, payrollProcessingMethodId);
        }

        public async Task<IEnumerable<EmployeeLoanView>> GetAllLoanPaymentByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            return await loanPaymentRepository.GetAllLoanPaymentByPayrollProcessingMethodId(payrollProcessingMethodId);
        }

        public async Task<LoanPayment> GetAsync(int id)
        {
            return await loanPaymentRepository.GetAsync(id);
        }

        public async Task<LoanPayment> InsertAsync(LoanPayment loanPayment)
        {
            return await loanPaymentRepository.InsertAsync(loanPayment);
        }

        public async Task<int> InsertAsync(IEnumerable<LoanPayment> loanPayment)
        {
            return await loanPaymentRepository.InsertAsync(loanPayment);
        }

        public async Task<int> UpdateAsync(LoanPayment loanPayment)
        {
            return await loanPaymentRepository.UpdateAsync(loanPayment);
        }
       
    }
}
