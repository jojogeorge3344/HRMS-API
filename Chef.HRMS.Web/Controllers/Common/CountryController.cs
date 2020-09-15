using Chef.Common.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CountryController : ControllerBase
    {
        private readonly ICountryService countryService;

        public CountryController(ICountryService countryService)
        {
            this.countryService = countryService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Country>>> GetAll()
        {
            var countries = await countryService.GetAllAsync();

            return Ok(countries);
        }
    }
}