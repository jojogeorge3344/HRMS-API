using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IBankMasterService : IAsyncService<HRMSBank>
{
    Task<bool> IsBankCodeExist(string code);
    Task<bool> IsBankNameExist(string name);

}
