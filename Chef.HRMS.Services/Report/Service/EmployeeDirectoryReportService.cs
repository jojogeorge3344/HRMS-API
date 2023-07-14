using Chef.HRMS.Models;
using Chef.HRMS.Models.Report;
using Chef.HRMS.Repositories.Report;

namespace Chef.HRMS.Services.Report;

public class EmployeeDirectoryReportService : AsyncService<EmployeeBasicDetailsReport>, IEmployeeDirectoryReportService
{
    private readonly IEmployeeDirectoryReportRepository employeeDirectoryReportRepository;

    public EmployeeDirectoryReportService(IEmployeeDirectoryReportRepository employeeDirectoryReportRepository)
    {
        this.employeeDirectoryReportRepository = employeeDirectoryReportRepository;
    }

    public async Task<WPSDetailsReportView> GetWPSDetailsByemployeeId(int employeeId)
    {
        return await employeeDirectoryReportRepository.GetWPSDetailsByemployeeId(employeeId);
    }

    public async Task<EmployeeBasicDetailsReport> GetBasicDetailsByEmployeeId(int employeeId)
    {
        return await employeeDirectoryReportRepository.GetBasicDetailsByEmployeeId(employeeId);
    }

    public async Task<JobFillingReportView> GetJobFillingDetailsByEmployeeId(int employeeId)
    {
        return await employeeDirectoryReportRepository.GetJobFillingDetailsByEmployeeId(employeeId);
    }

    public async Task<AddressDetailsReportView> GetAddressDetailsByEmployeeId(int employeeId)
    {
        return await employeeDirectoryReportRepository.GetAddressDetailsByEmployeeId(employeeId);
    }

    public async Task<IEnumerable<SalaryDetailsReportView>> GetSalaryDetailsByEmployeeId(int employeeId)
    {
        return await employeeDirectoryReportRepository.GetSalaryDetailsByEmployeeId(employeeId);
    }
    public async Task<JobDetailsReportView> GetByEmployeeId(int employeeId)
    {
        return await employeeDirectoryReportRepository.GetByEmployeeId(employeeId);
    }
}
