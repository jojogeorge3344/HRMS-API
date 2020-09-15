using Chef.Common.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StateController : ControllerBase
    {
        private readonly IStateService stateService;

        public StateController(IStateService stateService)
        {
            this.stateService = stateService;
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<State>> Get(int id)
        {
            var state = await stateService.GetAsync(id);

            if (state == null)
            {
                return NotFound();
            }

            return Ok(state);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<State>>> GetAll()
        {
            var states = await stateService.GetAllAsync();

            return Ok(states);
        }

        [HttpGet("GetAllByCountry/{countryId}")]
        public async Task<ActionResult<IEnumerable<State>>> GetAllByCountryId(int countryId)
        {
            var states = await stateService.GetAllByCountry(countryId);

            return Ok(states);
        }
    }
}