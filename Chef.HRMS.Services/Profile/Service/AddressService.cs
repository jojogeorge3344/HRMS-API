using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class AddressService : AsyncService<Address>, IAddressService
{
    private readonly IAddressRepository addressRepository;

    public AddressService(IAddressRepository addressRepository)
    {
        this.addressRepository = addressRepository;
    }

    public async Task<IEnumerable<Address>> GetAllByEmployeeId(int employeeId)
    {
        return await addressRepository.GetAllByEmployeeId(employeeId);
    }
}
