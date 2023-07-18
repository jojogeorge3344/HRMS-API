using Chef.Common.Authentication.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EmployeeRevisionDetailsOldService : AsyncService<EmployeeRevisionDetailsOld>, IEmployeeRevisionDetailsOldService
{
    private readonly IEmployeeRevisionDetailsOldRepository employeeRevisionDetailsOldRepository;
    private readonly IAuthService authService;

    public EmployeeRevisionDetailsOldService(IEmployeeRevisionDetailsOldRepository employeeRevisionDetailsOldRepository, IAuthService authService)
    {
        this.employeeRevisionDetailsOldRepository = employeeRevisionDetailsOldRepository;
        this.authService = authService;
    }

    public async Task<IEnumerable<EmployeeRevisionDetailsOld>> GetOldEmployeeRevisionSalaryDetail(int employeeRevisionId)
    {
        return await employeeRevisionDetailsOldRepository.GetOldEmployeeRevisionSalaryDetail(employeeRevisionId);
    }

    public new async Task<int> InsertAsync(EmployeeRevisionDetailsOld employeeRevisionDetailsOld)
    {
        return await employeeRevisionDetailsOldRepository.InsertAsync(employeeRevisionDetailsOld);
    }

    public async Task<int> InsertAsync(IEnumerable<EmployeeRevisionDetailsOld> employeeRevisionDetailsOld)
    {
        return await employeeRevisionDetailsOldRepository.InsertAsync(employeeRevisionDetailsOld);
    }

    public async Task<int> UpdateAsync(IEnumerable<EmployeeRevisionDetailsOld> employeeRevisionDetailsOld)
    {
        return await employeeRevisionDetailsOldRepository.UpdateAsync(employeeRevisionDetailsOld);
    }
}