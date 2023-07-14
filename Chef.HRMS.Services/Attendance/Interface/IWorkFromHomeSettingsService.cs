using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface IWorkFromHomeSettingsService : IAsyncService<WorkFromHomeSettings>
{
    Task<WorkFromHomeSettings> GetTopOneWorkFromHomeSettings();
}
