using Chef.Common.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services.Common;

public class CountryService : AsyncService<Country>, ICountryService
{
    private readonly ICountryRepository countryRepository;

    public CountryService(ICountryRepository countryRepository)
    {
        this.countryRepository = countryRepository;
    } 
}