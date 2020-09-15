using Chef.Common.Repositories;
using Chef.HRMS.Models;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public interface IMyProfileRepository : IGenericRepository<MyProfileView>
    {
        Task<MyProfileView> GetMyProfileDetailsAsync(int employeeId);
    }
}
