using Chef.Common.Authentication.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EmployeeRevisionOldService : AsyncService<EmployeeRevisionOld>, IEmployeeRevisionOldService
{
    private readonly IEmployeeRevisionOldRepository employeeRevisionOldRepository;

    public EmployeeRevisionOldService(IEmployeeRevisionOldRepository employeeRevisionOldRepository)
    {
        this.employeeRevisionOldRepository = employeeRevisionOldRepository;
    } 

    public async Task<EmployeeRevisionOld> GetEmployeeRevisionOld(int employeeRevisionId)
    {
        return await employeeRevisionOldRepository.GetEmployeeRevisionOld(employeeRevisionId);
    }
}