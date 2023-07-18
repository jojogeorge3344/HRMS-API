using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class LoanPaymentService : AsyncService<LoanPayment>, ILoanPaymentService
{
    private readonly ILoanPaymentRepository loanPaymentRepository;

    public LoanPaymentService(ILoanPaymentRepository loanPaymentRepository)
    {
        this.loanPaymentRepository = loanPaymentRepository;
    }

    public async Task<IEnumerable<EmployeeLoanView>> GetAllLoanPaymentByEmployeeId(int employeeId, int payrollProcessingMethodId)
    {
        return await loanPaymentRepository.GetAllLoanPaymentByEmployeeId(employeeId, payrollProcessingMethodId);
    }

    public async Task<IEnumerable<EmployeeLoanView>> GetAllLoanPaymentByPayrollProcessingMethodId(int payGroupId, int year, string month)
    {
        return await loanPaymentRepository.GetAllLoanPaymentByPayrollProcessingMethodId(payGroupId, year, month);
    }

    public async Task<int> InsertAsync(IEnumerable<LoanPayment> loanPayment)
    {
        return await loanPaymentRepository.InsertAsync(loanPayment);
    }
}
