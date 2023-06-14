using Chef.Common.Models;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.Report
{
    public interface IPayslipReportService : IAsyncService<PayrollComponentDetails>
    {
        Task<IEnumerable<PayrollHeaderView>> EmployeeHeaderDetails(string employeeIds,DateTime fromDate,DateTime ToDate, string paygroupIds,string departmentIds,string designationIds);
        Task<IEnumerable<PayrollComponentReportView>> EmployeeComponentDetails(string employeeIds, DateTime fromDate, DateTime ToDate, string paygroupIds, string departmentIds, string designationIds);
        Task<IEnumerable<OvertimeDetailReportView>> EmployeeOverTimeDetails(string employeeIds, DateTime fromDate, DateTime ToDate);
        Task<IEnumerable<LoanDetailsReportView>> EmployeeLoanDetails(string employeeIds, DateTime fromDate, DateTime ToDate);


    }
}
