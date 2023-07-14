using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IEmployeeBankAccountService : IAsyncService<EmployeeBankAccount>
{
    Task<EmployeeBankAccount> GetBankAccountByEmployeeId(int employeeId);
}
