using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class WPSGroupService : IWPSGroupService
    {
        private readonly IWPSGroupRepository wpsGroupRepository;

        public WPSGroupService(IWPSGroupRepository wpsGroupRepository)
        {
            this.wpsGroupRepository = wpsGroupRepository;
        }
        public async Task<int> DeleteAsync(int id)
        {
            return await wpsGroupRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<WPSGroup>> GetAllAsync()
        {
            return await wpsGroupRepository.GetAllAsync();
        }

        public async Task<WPSGroup> GetAsync(int id)
        {
            return await wpsGroupRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(WPSGroup wpsGroup)
        {
            return await wpsGroupRepository.InsertAsync(wpsGroup);
        }

        public async Task<int> UpdateAsync(WPSGroup wpsGroup)
        {
            return await wpsGroupRepository.UpdateAsync(wpsGroup);
        }
    }

}
