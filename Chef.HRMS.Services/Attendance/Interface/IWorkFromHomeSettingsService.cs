using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IWorkFromHomeSettingsService : IAsyncService<WorkFromHomeSettings>
    {
        Task<WorkFromHomeSettings> GetTopOneWorkFromHomeSettings();
    }
}
