using Chef.HRMS.Models.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.Report
{
    public interface IPayrollStructureReportRepository : IGenericRepository<PayrollStructureReportView>
    {
        Task<IEnumerable<PayrollStructureReportView>> GetEmployeePayrollProcessDetails(DateTime fromDate, DateTime ToDate, string payrollStructureIds, string paygroupIds, string designationIds, string employeeIds);
    }
}
