using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface ILoanPaymentService : IAsyncService<LoanPayment>
    {
        Task<IEnumerable<EmployeeLoanView>> GetAllLoanPaymentByPayrollProcessingMethodId(int payrollProcessingMethodId);
        Task<IEnumerable<EmployeeLoanView>> GetAllLoanPaymentByEmployeeId(int employeeId, int payrollProcessingMethodId);
        Task<int> InsertAsync(IEnumerable<LoanPayment> loanPayment);
    }
}
