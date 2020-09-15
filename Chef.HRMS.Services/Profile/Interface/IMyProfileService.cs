using Chef.Common.Services;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public interface IMyProfileService : IAsyncService<MyProfileView>
    {
        Task<MyProfileView> GetMyProfileDetailsAsync(int employeeId);
    }
}
