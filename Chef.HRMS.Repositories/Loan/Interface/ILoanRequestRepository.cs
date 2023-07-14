using Chef.HRMS.Models.Loan;

namespace Chef.HRMS.Repositories;

public interface ILoanRequestRepository : IGenericRepository<LoanRequest>
{
    Task<IEnumerable<EmployeeLoanView>> GetAllLoanByPayrollProcessingMethodId(int payrollProcessingMethodId);
    Task<IEnumerable<EmployeeLoanView>> GetAllLoanByEmployeeId(int employeeId, int payrollProcessingMethodId);
    Task<int> GetLoanLastRequestId();
    Task<IEnumerable<LoanRequestedViewModel>> GetRequestedDateByEmployeeId(int employeeId);
    Task<LoanRequestDetailsView> GetLoanRequestDetails(int loanId);

}