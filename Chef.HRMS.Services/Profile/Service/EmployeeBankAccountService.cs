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
     
    public Task<EmployeeBankAccount> GetBankAccountByEmployeeId(int employeeId)
    {
        return employeeBankAccountRepository.GetBankAccountByEmployeeId(employeeId);
    }
}