using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPayrollProcessingMethodService : IAsyncService<PayrollProcessingMethod>
    {
        Task<IEnumerable<PayrollReview>> GetAllPayrollReviewByProcessingMethodId(int payrollProcessingMethodId);
        Task<IEnumerable<Employee>> GetAllUnProcessedEmployees(int year, int month);
        Task<IEnumerable<PayrollReviewBreakup>> GetPayBreakUpByEmployeeId(int employeeId, int payrollProcessingMethodId);
        Task<IEnumerable<PayrollProcessingMethod>> GetPastSixMonthDetails();
        Task<int> UpadtePayrollProcessingStep(int payrollProcessingMethodId, int completedStep);
        Task<string> InsertOrAlreadyExist(PayrollProcessingMethod payrollProcessingMethod);
        Task<int> InsertLOPDeduction(IEnumerable<LOPDeduction> lopDeduction);
    }
}
