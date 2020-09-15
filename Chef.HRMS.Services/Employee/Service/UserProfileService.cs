using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class UserProfileService : AsyncService, IUserProfileService
    {
        private readonly IUserProfileRepository userProfileRepository;

        public UserProfileService(IUserProfileRepository userProfileRepository)
        {
            this.userProfileRepository = userProfileRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await userProfileRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<UserProfile>> GetAllAsync()
        {
            return await userProfileRepository.GetAllAsync();
        }

        public async Task<UserProfile> GetAsync(int id)
        {
            return await userProfileRepository.GetAsync(id);
        }

        public async Task<UserProfile> InsertAsync(UserProfile userProfile)
        {
            return await userProfileRepository.InsertAsync(userProfile);
        }

        public async Task<int> UpdateAsync(UserProfile userProfile)
        {
            return await userProfileRepository.UpdateAsync(userProfile);
        }
    }
}