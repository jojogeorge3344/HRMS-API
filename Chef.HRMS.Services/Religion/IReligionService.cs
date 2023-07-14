using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IReligionService : IAsyncService<Religion>
{
    Task<bool> IsReligionCodeExist(string code);
    Task<bool> IsReligionNameExist(string name);

}
