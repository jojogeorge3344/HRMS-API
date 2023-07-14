namespace Chef.HRMS.Repositories;

public class EmployeeBankAccountRepository : GenericRepository<EmployeeBankAccount>, IEmployeeBankAccountRepository
{
    public EmployeeBankAccountRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<EmployeeBankAccount> GetBankAccountByEmployeeId(int employeeId)
    {
        string sql = @"SELECT * FROM hrms.employeebankaccount 
                                        WHERE employeeid=@employeeId where isarchived=false";  // Added for where isarchived=false by Nir

        return await Connection.QueryFirstOrDefaultAsync<EmployeeBankAccount>(sql, new { employeeId });
    }
}