using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IPayrollProcessingMethodService : IAsyncService<PayrollProcessingMethod>
    {
        Task<IEnumerable<PayrollReview>> GetAllPayrollReviewByProcessingMethodId(int payrollProcessingMethodId);
        Task<IEnumerable<HRMSEmployee>> GetAllUnProcessedEmployees(int year, int month);
        Task<IEnumerable<PayrollReviewBreakup>> GetPayBreakUpByEmployeeId(int employeeId, int payrollProcessingMethodId);
        Task<IEnumerable<PayrollProcessingMethod>> GetPastSixMonthDetails();
        Task<int> UpadtePayrollProcessingStep(int payrollProcessingMethodId, int completedStep);
        Task<string> InsertOrAlreadyExist(PayrollProcessingMethod payrollProcessingMethod);
        Task<int> InsertLOPDeduction(IEnumerable<LOPDeduction> lopDeduction);
        Task<int> GetDetailsById(int employeeid, int month, int year);
        Task<IEnumerable<PayrollProcessingMethod>> GetEmployeeDetails(int employeeid, int paygroupid);
        Task<int> InsertPayrollFixedComponentDetaisl(int payrollProcessId, DateTime payrollprocessdate, int paygroupid);
        Task<IEnumerable<PayrollSummary>> GetPayrollComponentsSummary(int payrollprocessid);
        Task<IEnumerable<PayrollProcessingMethod>> GetDetailsByPaygroupId(int paygroupid, int prevmonth, int prevyear);
        Task<IEnumerable<PayrollMonth>> GetPayrollProcessingMonth(int paygroupId);
    }
}
