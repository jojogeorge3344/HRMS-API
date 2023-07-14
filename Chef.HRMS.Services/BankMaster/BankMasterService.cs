using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class BankMasterService : AsyncService<HRMSBank>, IBankMasterService
{
    private readonly IBankMasterRepository bankMasterRepository;

    public BankMasterService(IBankMasterRepository bankMasterRepository)
    {
        this.bankMasterRepository = bankMasterRepository;
    }

    public async Task<bool> IsBankCodeExist(string code)
    {
        return await bankMasterRepository.IsBankCodeExist(code);
    }

    public async Task<bool> IsBankNameExist(string name)
    {
        return await bankMasterRepository.IsBankNameExist(name);
    }
}
