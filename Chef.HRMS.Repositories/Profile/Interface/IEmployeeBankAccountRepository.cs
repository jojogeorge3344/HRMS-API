namespace Chef.HRMS.Repositories;

public interface IEmployeeBankAccountRepository : IGenericRepository<EmployeeBankAccount>
{
    Task<EmployeeBankAccount> GetBankAccountByEmployeeId(int employeeId);
}