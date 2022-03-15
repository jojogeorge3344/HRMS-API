using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Models.Loan;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface ILoanRequestService : IAsyncService<LoanRequest>
    {
        Task<IEnumerable<EmployeeLoanView>> GetAllLoanByPayrollProcessingMethodId(int payrollProcessingMethodId);
        Task<IEnumerable<EmployeeLoanView>> GetAllLoanByEmployeeId(int employeeId, int payrollProcessingMethodId);
        Task<int> GetLoanLastRequestId();

        Task<IEnumerable<LoanRequestedViewModel>> GetRequestedDateByEmployeeId(int employeeId);
    }
}