using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;

namespace Chef.HRMS.Repositories
{
    public interface IPayrollProcessingMethodRepository : IGenericRepository<PayrollProcessingMethod>
    {
        Task<IEnumerable<PayrollReview>> GetAllPayrollReviewByProcessingMethodId(int payrollProcessingMethodId);
        Task<IEnumerable<HRMSEmployee>> GetAllUnProcessedEmployees(int year, int month);
        Task<IEnumerable<PayrollProcessingMethod>> GetPastSixMonthDetails();
        Task<IEnumerable<PayrollReviewBreakup>> GetPayBreakUpByEmployeeId(int employeeId, int payrollProcessingMethodId);
        Task<int> UpadtePayrollProcessingStep(int payrollProcessingMethodId, int completedStep);
        Task<string> InsertOrAlreadyExist(PayrollProcessingMethod payrollProcessingMethod);
        Task<int> InsertLOPDeduction(IEnumerable<LOPDeduction> lopDeduction);
        Task<int> GetDetailsById(int employeeid, int month, int year);
        Task<IEnumerable<PayrollProcessingMethod>> GetEmployeeDetails(int employeeid, int paygroupid);
        Task<int> InsertPayrollFixedComponentDetails(int payrollProcessId, DateTime payrollprocessdate, int paygroupId);
        Task<IEnumerable<PayrollComponentDetails>> GetPayrollComponentsSummary(int payrollprocessid);
        Task<IEnumerable<PayrollProcessingMethod>> GetDetailsByPaygroupId(int paygroupid, int prevmonth, int prevyear);
        Task<IEnumerable<PayrollMonth>> GetPayrollProcessingMonth(int paygroupId);
        Task<IEnumerable<PayrollProcessingMethod>> GetAllByProcessignStep(int stepno);
    }
}
