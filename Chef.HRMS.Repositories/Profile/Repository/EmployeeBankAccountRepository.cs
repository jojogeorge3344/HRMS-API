using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeBankAccountRepository : GenericRepository<EmployeeBankAccount>, IEmployeeBankAccountRepository
    {
        public EmployeeBankAccountRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<EmployeeBankAccount> GetBankAccountByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                string sql = @"SELECT * FROM employeebankaccount 
                                        WHERE employeeid=@employeeId";

                return await Connection.QueryFirstOrDefaultAsync<EmployeeBankAccount>(sql, new { employeeId });
            }
        }
    }
}