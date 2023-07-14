using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EmployeeBankAccountService : AsyncService<EmployeeBankAccount>, IEmployeeBankAccountService
{
    private readonly IEmployeeBankAccountRepository employeeBankAccountRepository;

    public EmployeeBankAccountService(IEmployeeBankAccountRepository employeeBankAccountRepository)
    {
        this.employeeBankAccountRepository = employeeBankAccountRepository;
    }

    public Task<int> DeleteAsync(int id)
    {
        return employeeBankAccountRepository.DeleteAsync(id);
    }

    public Task<IEnumerable<EmployeeBankAccount>> GetAllAsync()
    {
        return employeeBankAccountRepository.GetAllAsync();
    }

    public Task<EmployeeBankAccount> GetAsync(int id)
    {
        return employeeBankAccountRepository.GetAsync(id);
    }

    public Task<EmployeeBankAccount> GetBankAccountByEmployeeId(int employeeId)
    {
        return employeeBankAccountRepository.GetBankAccountByEmployeeId(employeeId);
    }

    public Task<int> InsertAsync(EmployeeBankAccount employeeBankAccount)
    {
        return employeeBankAccountRepository.InsertAsync(employeeBankAccount);
    }

    public Task<int> UpdateAsync(EmployeeBankAccount employeeBankAccount)
    {
        return employeeBankAccountRepository.UpdateAsync(employeeBankAccount);
    }
}