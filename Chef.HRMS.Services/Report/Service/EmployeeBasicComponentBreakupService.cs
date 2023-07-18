using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;

namespace Chef.HRMS.Services;

public class EmployeeBasicComponentBreakupService : AsyncService<EmployeeBasicComponentBreakupView>, IEmployeeBasicComponentBreakupService
{
    private readonly IEmployeeBasicComponentBreakupRepository employeeBasicComponentBreakupRepository;

    public EmployeeBasicComponentBreakupService(IEmployeeBasicComponentBreakupRepository employeeBasicComponentBreakupRepository)
    {
        this.employeeBasicComponentBreakupRepository = employeeBasicComponentBreakupRepository;
    }

    public Task<IEnumerable<EmployeeBasicComponentBreakupView>> GetAllEmployeeBasicComponentBreakupView(int month, int year)
    {
        return employeeBasicComponentBreakupRepository.GetAllEmployeeBasicComponentBreakupView(month, year);
    }
}
