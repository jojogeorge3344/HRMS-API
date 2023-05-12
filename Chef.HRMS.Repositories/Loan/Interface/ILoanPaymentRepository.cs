using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILoanPaymentRepository : IGenericRepository<LoanPayment>
    {
        Task<IEnumerable<EmployeeLoanView>> GetAllLoanPaymentByPayrollProcessingMethodId(int payGroupId, int year, string month);

        Task<IEnumerable<EmployeeLoanView>> GetAllLoanPaymentByEmployeeId(int employeeId, int payrollProcessingMethodId);

        Task<int> InsertAsync(IEnumerable<LoanPayment> loanPayment);
    }
}
