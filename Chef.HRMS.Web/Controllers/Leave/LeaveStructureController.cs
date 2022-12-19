using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/leave/[controller]")]
    [ApiController]
    public class LeaveStructureController : ControllerBase
    {
        private readonly ILeaveStructureService leaveStructureService;

        public LeaveStructureController(ILeaveStructureService leaveStructureService)
        {
            this.leaveStructureService = leaveStructureService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var leaveStructure = await leaveStructureService.GetAsync(id);

            if (leaveStructure == null)
            {
                return NotFound();
            }

            var result = await leaveStructureService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<LeaveStructure>> Get(int id)
        {
            var leaveStructure = await leaveStructureService.GetAsync(id);

            if (leaveStructure == null)
            {
                return NotFound();
            }

            return Ok(leaveStructure);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<LeaveStructure>>> GetAll()
        {
            var leaveStructures = await leaveStructureService.GetAllAsync();

            return Ok(leaveStructures);
        }
        [HttpGet("GetAllConfiguredLeaveStructures")]
        public async Task<ActionResult<IEnumerable<LeaveStructure>>> GetAllConfiguredLeaveStructures()
        {
            var leaveStructures = await leaveStructureService.GetAllConfiguredLeaveStructures();

            return Ok(leaveStructures);
        }
        [HttpGet("GetAllAssignedLeaveStructure")]
        public async Task<ActionResult<IEnumerable<int>>> GetAllAssignedLeaveStructure()
        {
            var leaveStructures = await leaveStructureService.GetAllAssignedLeaveStructure();

            return Ok(leaveStructures);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(LeaveStructure leaveStructure)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await leaveStructureService.InsertAsync(leaveStructure);

            return Ok(id);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(LeaveStructure leaveStructure)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await leaveStructureService.UpdateAsync(leaveStructure);

            return Ok(result);
        }

        [HttpPut("UpdateLeaveStructure/{id}/{isConfigured}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateLeaveStructure(int id, bool isConfigured)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await leaveStructureService.UpdateLeaveStructure(id, isConfigured);

            return Ok(result);
        }
    }
}