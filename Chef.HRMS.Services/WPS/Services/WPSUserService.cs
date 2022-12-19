using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class WPSUserService : IWPSUserService
    {
        private readonly IWPSUserRepository wpsUserRepository;

        public WPSUserService(IWPSUserRepository wpsUserRepository)
        {
            this.wpsUserRepository = wpsUserRepository;
        }
        public async Task<int> DeleteAsync(int id)
        {
            return await wpsUserRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<WPSUser>> GetAllAsync()
        {
            return await wpsUserRepository.GetAllAsync();
        }

        public async Task<IEnumerable<WPSUser>> GetAllByemployeeId(int employeeId)
        {
            return await wpsUserRepository.GetAllByemployeeId(employeeId);
        }

        public async Task<WPSUser> GetAsync(int id)
        {
            return await wpsUserRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(WPSUser wpsUser)
        {
            return await wpsUserRepository.InsertAsync(wpsUser);
        }

        public async Task<int> UpdateAsync(WPSUser wpsUser)
        {
            return await wpsUserRepository.Update(wpsUser);
        }
    }

}
