using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface ILoanSettingRepository : IGenericRepository<LoanSetting>
    {
        Task<int> GetLoanSettingId();
        Task<LoanSetting> GetTopOneLoanSetting();
    }
}