using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Chef.HRMS.Web.Controllers
{
    [ApiController]
    [Route("api/Settings/OverTime/[controller]")]
    public class OverTimePolicyController : ControllerBase
    {
        private readonly IOverTimePolicyService overTimePolicyService;

        public OverTimePolicyController(IOverTimePolicyService overTimePolicyService)
        {
            this.overTimePolicyService = overTimePolicyService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var overTimePolicy = await overTimePolicyService.GetAsync(id);

            if (overTimePolicy == null)
            {
                return NotFound();
            }

            var result = await overTimePolicyService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<OverTimePolicy>> Get(int id)
        {
            var overTimePolicy = await overTimePolicyService.GetAsync(id);

            if (overTimePolicy == null)
            {
                return NotFound();
            }

            return Ok(overTimePolicy);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<OverTimePolicy>>> GetAll()
        {
            var overTimePolicy = await overTimePolicyService.GetAllAsync();

            return Ok(overTimePolicy);
        }

        [HttpGet("GetAllAssignedOverTimePolicy")]
        public async Task<ActionResult<IEnumerable<int>>> GetAllAssignedOverTimePolicy()
        {
            var overTimePolicy = await overTimePolicyService.GetAllAssignedOverTimePolicy();

            return Ok(overTimePolicy);
        }
        [HttpGet("GetAllAssignedOverTimePolicyCount")]
        public async Task<ActionResult<IEnumerable<OverTimePolicy>>> GetAllAssignedOverTimePolicyCount()
        {
            var overTimePolicy = await overTimePolicyService.GetAllAssignedOverTimePolicyCount();

            return Ok(overTimePolicy);
        }
        [HttpGet("GetAllConfiguredOvertimePolicies")]
        public async Task<ActionResult<IEnumerable<int>>> GetAllConfiguredOvertimePolicies()
        {
            var overTimePolicy = await overTimePolicyService.GetAllConfiguredOvertimePolicies();

            return Ok(overTimePolicy);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(OverTimePolicy overTimePolicy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            overTimePolicy = await overTimePolicyService.InsertAsync(overTimePolicy);

            return CreatedAtAction(nameof(Insert), overTimePolicy);
        }

        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(OverTimePolicy overTimePolicy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await overTimePolicyService.UpdateAsync(overTimePolicy);

            return Ok(result);
        }

        [HttpPut("UpdateOverTimePolicy/{id}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> UpdateOverTimePolicy(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await overTimePolicyService.UpdateOverTimePolicy(id);

            return Ok(result);
        }
    }
}