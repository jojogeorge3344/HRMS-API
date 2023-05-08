using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface ILoanSettingService : IAsyncService<LoanSetting>
    {
        Task<int> GetLoanSettingId();
        Task<LoanSetting> GetTopOneLoanSetting();
        Task<IEnumerable<LoanAdvanceRepaymentView>> GetLoanRepayment();
        Task<IEnumerable<LoanAdvanceRepaymentView>> GetLoanAdvance();
        
    }
}