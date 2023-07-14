using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IEndOfServiceService : IAsyncService<EndOfService>
{
    Task<IEnumerable<BenefitTypes>> GetEmployeeEOSAccrualType();
    Task<IEnumerable<BenefitTypes>> GetEmployeeEOSpaymentType();
    Task<bool> IsBFCodeExist(string code);

}
