using Chef.HRMS.Models.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.Report
{
    public interface IEmployeeDirectoryReportRepository : IGenericRepository<EmployeeBasicDetailsReport>
    {
        Task<EmployeeBasicDetailsReport> GetBasicDetailsByEmployeeId(int employeeId);
        Task<JobFillingReportView> GetJobFillingDetailsByEmployeeId(int employeeId);
        Task<WPSDetailsReportView> GetWPSDetailsByemployeeId(int employeeId);
        Task<AddressDetailsReportView> GetAddressDetailsByEmployeeId(int employeeId);
        Task<IEnumerable<SalaryDetailsReportView>> GetSalaryDetailsByEmployeeId(int employeeId);
        Task<JobDetailsReportView> GetByEmployeeId(int employeeId);

    }
}
