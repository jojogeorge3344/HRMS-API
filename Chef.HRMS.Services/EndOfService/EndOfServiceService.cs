using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class EndOfServiceService : AsyncService<EndOfService>, IEndOfServiceService
{
    private readonly IEndOfServiceRepository endOfServiceRepository;

    public EndOfServiceService(IEndOfServiceRepository endOfServiceRepository)
    {
        this.endOfServiceRepository = endOfServiceRepository;
    }

    public async Task<IEnumerable<BenefitTypes>> GetEmployeeEOSAccrualType()
    {
        return await endOfServiceRepository.GetEmployeeEOSAccrualType();
    }

    public async Task<IEnumerable<BenefitTypes>> GetEmployeeEOSpaymentType()
    {
        return await endOfServiceRepository.GetEmployeeEOSpaymentType();
    }

    public async Task<bool> IsBFCodeExist(string code)
    {
        return await endOfServiceRepository.IsBFCodeExist(code);
    }
}
