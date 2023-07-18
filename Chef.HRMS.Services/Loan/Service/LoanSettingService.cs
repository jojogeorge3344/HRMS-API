using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class LoanSettingService : AsyncService<LoanSetting>, ILoanSettingService
{
    private readonly ILoanSettingRepository loanSettingRepository;

    public LoanSettingService(ILoanSettingRepository LoanSettingRepository)
    {
        this.loanSettingRepository = LoanSettingRepository;
    } 

    public async Task<int> GetLoanSettingId()
    {
        return await loanSettingRepository.GetLoanSettingId();
    }

    public async Task<LoanSetting> GetTopOneLoanSetting()
    {
        return await loanSettingRepository.GetTopOneLoanSetting();
    }

    public async Task<IEnumerable<LoanAdvanceRepaymentView>> GetLoanRepayment()
    {
        return await loanSettingRepository.GetLoanRepayment();
    }

    public async Task<IEnumerable<LoanAdvanceRepaymentView>> GetLoanAdvance()
    {
        return await loanSettingRepository.GetLoanAdvance();
    }
}