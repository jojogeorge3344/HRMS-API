using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.Report
{
    public interface IPayrollStructureReportService : IAsyncService<PayrollStructureReportView>
    {
        Task<IEnumerable<PayrollStructureReportView>> GetEmployeePayrollProcessDetails(DateTime fromDate, DateTime ToDate, string payrollStructureIds, string paygroupIds, string designationIds, string employeeIds);
        Task<byte[]> PayrollStructureExcelReport(DateTime fromDate, DateTime ToDate, string designationIds, string employeeIds, string departmentIds);
    }
}
