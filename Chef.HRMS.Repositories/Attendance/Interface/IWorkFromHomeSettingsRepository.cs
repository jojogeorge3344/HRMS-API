using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IWorkFromHomeSettingsRepository : IGenericRepository<WorkFromHomeSettings>
    {
        Task<WorkFromHomeSettings> GetTopOneWorkFromHomeSettings();
    }
}
