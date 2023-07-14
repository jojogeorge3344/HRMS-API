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

    public Task<int> DeleteAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<EmployeeBasicComponentBreakupView>> GetAllAsync()
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<EmployeeBasicComponentBreakupView>> GetAllEmployeeBasicComponentBreakupView(int month, int year)
    {
        return employeeBasicComponentBreakupRepository.GetAllEmployeeBasicComponentBreakupView(month, year);
    }

    public Task<EmployeeBasicComponentBreakupView> GetAsync(int id)
    {
        throw new NotImplementedException();
    }

    public Task<EmployeeBasicComponentBreakupView> InsertAsync(EmployeeBasicComponentBreakupView obj)
    {
        throw new NotImplementedException();
    }

    public Task<int> UpdateAsync(EmployeeBasicComponentBreakupView obj)
    {
        throw new NotImplementedException();
    }
}
