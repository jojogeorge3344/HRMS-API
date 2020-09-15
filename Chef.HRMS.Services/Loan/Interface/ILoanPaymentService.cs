using Chef.Common.Services;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Text;
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
