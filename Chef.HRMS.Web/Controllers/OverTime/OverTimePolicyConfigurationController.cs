using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [ApiController]
    [Route("api/settings/OverTime/[controller]")]
    public class OverTimePolicyConfigurationController : ControllerBase
    {
        private readonly IOverTimePolicyConfigurationService overTimePolicyConfigurationService;

        public OverTimePolicyConfigurationController(IOverTimePolicyConfigurationService overTimePolicyConfigurationService)
        {
            this.overTimePolicyConfigurationService = overTimePolicyConfigurationService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var overTimePolicyConfiguration = await overTimePolicyConfigurationService.GetAsync(id);

            if (overTimePolicyConfiguration == null)
            {
                return NotFound();
            }

            var result = await overTimePolicyConfigurationService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<OverTimePolicyConfiguration>> Get(int id)
        {
            var overTimePolicyConfiguration = await overTimePolicyConfigurationService.GetAsync(id);

            if (overTimePolicyConfiguration == null)
            {
                return NotFound();
            }

            return Ok(overTimePolicyConfiguration);
        }
        [HttpGet("GetByOverTimePolicyId/{id}")]
        public async Task<ActionResult<OverTimePolicyConfiguration>> GetByOverTimePolicyId(int id)
        {
            var overTimePolicyConfiguration = await overTimePolicyConfigurationService.GetByOverTimePolicyId(id);

            if (overTimePolicyConfiguration == null)
            {
                return NotFound();
            }

            return Ok(overTimePolicyConfiguration);
        }

        [HttpGet("GetOvertimeConfigurationById/{id}")]
        public async Task<ActionResult<OverTimePolicyConfiguration>> GetOvertimeConfigurationById(int id)
        {
            var overTimePolicyConfiguration = await overTimePolicyConfigurationService.GetOvertimeConfigurationById(id);

            if (overTimePolicyConfiguration == null)
            {
                return NotFound();
            }

            return Ok(overTimePolicyConfiguration);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<OverTimePolicyConfiguration>>> GetAll()
        {
            var overTimePolicyConfiguration = await overTimePolicyConfigurationService.GetAllAsync();

            return Ok(overTimePolicyConfiguration);
        }
        [HttpGet("GetAllAssignedOverTimePolicies")]
        public async Task<ActionResult<IEnumerable<int>>> GetAllAssignedOverTimePolicies()
        {
            var overTimePolicyConfiguration = await overTimePolicyConfigurationService.GetAllAssignedOverTimePolicies();

            return Ok(overTimePolicyConfiguration);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(OverTimePolicyConfiguration overTimePolicyConfiguration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await overTimePolicyConfigurationService.InsertAsync(overTimePolicyConfiguration);


            return Ok(id);
        }

        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(OverTimePolicyConfiguration overTimePolicyConfiguration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await overTimePolicyConfigurationService.UpdateAsync(overTimePolicyConfiguration);

            return Ok(result);
        }
    }
}