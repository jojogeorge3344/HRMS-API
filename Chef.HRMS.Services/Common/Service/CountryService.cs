using Chef.Common.Core.Services;
using Chef.Common.Models;
using Chef.Common.Services;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.Common
{
    public class CountryService : AsyncService<Country>, ICountryService
    {
        private readonly ICountryRepository countryRepository;

        public CountryService(ICountryRepository countryRepository)
        {
            this.countryRepository = countryRepository;
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await countryRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Country>> GetAllAsync()
        {
            return await countryRepository.GetAllAsync();
        }

        public async Task<Country> GetAsync(int id)
        {
            return await countryRepository.GetAsync(id);
        }

        public async Task<int> InsertAsync(Country obj)
        {
            return await countryRepository.InsertAsync(obj);
        }

        public async Task<int> UpdateAsync(Country obj)
        {
            return await countryRepository.UpdateAsync(obj);
        }
    }
}