using Chef.HRMS.Models;
using Chef.HRMS.Models.Loan;

namespace Chef.HRMS.Services;

public interface ILoanRequestService : IAsyncService<LoanRequest>
{
    Task<IEnumerable<EmployeeLoanView>> GetAllLoanByPayrollProcessingMethodId(int payrollProcessingMethodId);
    Task<IEnumerable<EmployeeLoanView>> GetAllLoanByEmployeeId(int employeeId, int payrollProcessingMethodId);
    Task<int> GetLoanLastRequestId();
    Task<IEnumerable<LoanRequestedViewModel>> GetRequestedDateByEmployeeId(int employeeId);
    Task<LoanRequestDetailsView> GetLoanRequestDetails(int loanId);
    Task<int> InsertLoan(LoanRequest loanRequest);
    Task<LoanRequest> GetLoanDetails(int id);
}