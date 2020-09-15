using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class MyProfileService : AsyncService, IMyProfileService
    {
        private readonly IMyProfileRepository myProfileRepository;

        public MyProfileService(IMyProfileRepository myProfileRepository)
        {
            this.myProfileRepository = myProfileRepository;
        }

        public async Task<MyProfileView> GetMyProfileDetailsAsync(int employeeId)
        {
            return await myProfileRepository.GetMyProfileDetailsAsync(employeeId);
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<MyProfileView>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<MyProfileView> GetAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<MyProfileView> InsertAsync(MyProfileView obj)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> UpdateAsync(MyProfileView obj)
        {
            throw new System.NotImplementedException();
        }
    }
}
