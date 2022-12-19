using Chef.Common.Core.Services;
using Chef.Common.Services;
using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Services
{
    public class AddressService : AsyncService<Address>, IAddressService
    {
        private readonly IAddressRepository addressRepository;

        public AddressService(IAddressRepository addressRepository)
        {
            this.addressRepository = addressRepository;
        }

        public async Task<int> InsertAsync(Address address)
        {
            return await addressRepository.InsertAsync(address);
        }

        public async Task<Address> GetAsync(int id)
        {
            return await addressRepository.GetAsync(id);
        }

        public async Task<int> UpdateAsync(Address address)
        {
            return await addressRepository.UpdateAsync(address);
        }

        public async Task<IEnumerable<Address>> GetAllAsync()
        {
            return await addressRepository.GetAllAsync();
        }

        public async Task<int> DeleteAsync(int id)
        {
            return await addressRepository.DeleteAsync(id);
        }

        public async Task<IEnumerable<Address>> GetAllByEmployeeId(int employeeId)
        {
            return await addressRepository.GetAllByEmployeeId(employeeId);
        }
    }
}
