using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class LoanSettingService : AsyncService<LoanSetting>, ILoanSettingService
    {
        private readonly ILoanSettingRepository loanSettingRepository;

        public LoanSettingService(ILoanSettingRepository LoanSettingRepository)
        {
            this.loanSettingRepository = LoanSettingRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await loanSettingRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<LoanSetting>> GetAllAsync()
        {
            return await loanSettingRepository.GetAllAsync();
        }

        public async Task<LoanSetting> GetAsync(int id)
        {
            return await loanSettingRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(LoanSetting LoanSetting)
        {
            return await loanSettingRepository.InsertAsync(LoanSetting);
        }

        public async Task<int> UpdateAsync(LoanSetting LoanSetting)
        {
            return await loanSettingRepository.UpdateAsync(LoanSetting);
        }

        public async Task<int> GetLoanSettingId()
        {
            return await loanSettingRepository.GetLoanSettingId();
        }

        public async Task<LoanSetting> GetTopOneLoanSetting()
        {
            return await loanSettingRepository.GetTopOneLoanSetting();
        }
    }
}