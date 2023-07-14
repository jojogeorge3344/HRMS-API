using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;

namespace Chef.HRMS.Services.Report;

public interface IEmployeeDirectoryReportService : IAsyncService<EmployeeBasicDetailsReport>
{
    Task<EmployeeBasicDetailsReport> GetBasicDetailsByEmployeeId(int employeeId);
    Task<JobFillingReportView> GetJobFillingDetailsByEmployeeId(int employeeId);
    Task<WPSDetailsReportView> GetWPSDetailsByemployeeId(int employeeId);
    Task<AddressDetailsReportView> GetAddressDetailsByEmployeeId(int employeeId);
    Task<IEnumerable<SalaryDetailsReportView>> GetSalaryDetailsByEmployeeId(int employeeId);
    Task<JobDetailsReportView> GetByEmployeeId(int employeeId);

}
