using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EmployeeBonusService : AsyncService<EmployeeBonus>, IEmployeeBonusService
{
    private readonly IEmployeeBonusRepository employeeBonusRepository;

    public EmployeeBonusService(IEmployeeBonusRepository employeeBonusRepository)
    {
        this.employeeBonusRepository = employeeBonusRepository;
    }

    public async Task<int> DeleteAsync(int id)
    {
        return await employeeBonusRepository.DeleteAsync(id);
    }

    public async Task<int> DeleteAllBonusByEmployeeId(int employeeId)
    {
        return await employeeBonusRepository.DeleteAllBonusByEmployeeId(employeeId);
    }

    public async Task<IEnumerable<EmployeeBonus>> GetAllBonusByEmployeeId(int employeeId)
    {
        return await employeeBonusRepository.GetAllBonusByEmployeeId(employeeId);
    }

    public async Task<IEnumerable<EmployeeBonus>> GetAllAsync()
    {
        return await employeeBonusRepository.GetAllAsync();
    }

    public async Task<EmployeeBonus> GetAsync(int id)
    {
        return await employeeBonusRepository.GetAsync(id);
    }

    public async Task<int> InsertAsync(EmployeeBonus employeeBonus)
    {
        return await employeeBonusRepository.InsertAsync(employeeBonus);
    }

    public async Task<int> UpdateAsync(EmployeeBonus employeeBonus)
    {
        return await employeeBonusRepository.UpdateAsync(employeeBonus);
    }

    public async Task<IEnumerable<EmployeeBonusView>> GetAllBonusByPayGroupId(int payrollProcessingMethodId)
    {
        return await employeeBonusRepository.GetAllBonusByPayGroupId(payrollProcessingMethodId);
    }

    public async Task<IEnumerable<EmployeeBonusView>> GetAllBonusByEmployeeIdAndPayrollProcessingMethodId(int employeeId, int payrollProcessingMethodId)
    {
        return await employeeBonusRepository.GetAllBonusByEmployeeIdAndPayrollProcessingMethodId(employeeId, payrollProcessingMethodId);
    }

}
