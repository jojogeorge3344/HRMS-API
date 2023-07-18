using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;

namespace Chef.HRMS.Services;

public class EmployeeReportService : AsyncService<EmployeeDetailView>, IEmployeeReportService
{
    private readonly IEmployeeReportRepository employeeReportRepository;

    public EmployeeReportService(IEmployeeReportRepository employeeReportRepository)
    {
        this.employeeReportRepository = employeeReportRepository;
    } 

    public async Task<IEnumerable<EmployeeDetailView>> GetAllEmployeeDetailView(int offSet)
    {
        return await employeeReportRepository.GetAllEmployeeDetailView(offSet);
    } 
}
