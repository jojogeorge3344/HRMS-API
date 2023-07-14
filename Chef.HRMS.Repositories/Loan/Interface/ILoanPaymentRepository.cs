namespace Chef.HRMS.Repositories;

public interface ILoanPaymentRepository : IGenericRepository<LoanPayment>
{
    Task<IEnumerable<EmployeeLoanView>> GetAllLoanPaymentByPayrollProcessingMethodId(int payGroupId, int year, string month);

    Task<IEnumerable<EmployeeLoanView>> GetAllLoanPaymentByEmployeeId(int employeeId, int payrollProcessingMethodId);

    Task<int> InsertAsync(IEnumerable<LoanPayment> loanPayment);
}
