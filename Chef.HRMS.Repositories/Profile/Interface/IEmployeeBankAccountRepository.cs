using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IEmployeeBankAccountRepository : IGenericRepository<EmployeeBankAccount>
    {
        Task<EmployeeBankAccount> GetBankAccountByEmployeeId(int employeeId);
    }
}