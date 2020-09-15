using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILoanRequestRepository : IGenericRepository<LoanRequest>
    {
        Task<IEnumerable<EmployeeLoanView>> GetAllLoanByPayrollProcessingMethodId(int payrollProcessingMethodId);
        Task<IEnumerable<EmployeeLoanView>> GetAllLoanByEmployeeId(int employeeId,int payrollProcessingMethodId);
        Task<int> GetLoanLastRequestId();
    }
}