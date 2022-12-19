using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeBankAccountRepository : GenericRepository<EmployeeBankAccount>, IEmployeeBankAccountRepository
    {
        public EmployeeBankAccountRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<EmployeeBankAccount> GetBankAccountByEmployeeId(int employeeId)
        {
                string sql = @"SELECT * FROM hrms.employeebankaccount 
                                        WHERE employeeid=@employeeId";

                return await Connection.QueryFirstOrDefaultAsync<EmployeeBankAccount>(sql, new { employeeId });
        }
    }
}