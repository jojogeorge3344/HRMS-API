using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IEmployeeBankAccountService : IAsyncService<EmployeeBankAccount>
    {
        Task<EmployeeBankAccount> GetBankAccountByEmployeeId(int employeeId);
    }
}
