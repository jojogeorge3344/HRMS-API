using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class BonusTypeService : AsyncService, IBonusTypeService
    {
        private readonly IBonusTypeRepository bonusTypeRepository;

        public BonusTypeService(IBonusTypeRepository bonusTypeRepository)
        {
            this.bonusTypeRepository = bonusTypeRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await bonusTypeRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<BonusType>> GetAllAsync()
        {
            return await bonusTypeRepository.GetAllAsync();
        }

        public async Task<BonusType> GetAsync(int id)
        {
            return await bonusTypeRepository.GetAsync(id);
        }

        public async Task<BonusType> InsertAsync(BonusType bonusType)
        {
            return await bonusTypeRepository.InsertAsync(bonusType);
        }

        public async Task<int> UpdateAsync(BonusType bonusType)
        {
            return await bonusTypeRepository.UpdateAsync(bonusType);
        }
    }
}
