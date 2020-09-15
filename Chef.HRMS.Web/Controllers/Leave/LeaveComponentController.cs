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
    public class LeaveComponentController : ControllerBase
    {
        private readonly ILeaveComponentService leaveComponentService;

        public LeaveComponentController(ILeaveComponentService leaveComponentService)
        {
            this.leaveComponentService = leaveComponentService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var leaveComponent = await leaveComponentService.GetAsync(id);

            if (leaveComponent == null)
            {
                return NotFound();
            }

            var result = await leaveComponentService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<LeaveComponent>> Get(int id)
        {
            var leaveComponent = await leaveComponentService.GetAsync(id);

            if (leaveComponent == null)
            {
                return NotFound();
            }

            return Ok(leaveComponent);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<LeaveComponent>>> GetAll()
        {
            var leaveComponents = await leaveComponentService.GetAllAsync();

            return Ok(leaveComponents);
        }
        [HttpGet("GetAllAssignedLeaveComponents")]
        public async Task<ActionResult<int>> GetAllAssignedLeaveComponents()
        {
            var leaveComponents = await leaveComponentService.GetAllAssignedLeaveComponents();

            if (leaveComponents == null)
            {
                return NotFound();
            }

            return Ok(leaveComponents);
        }


        [HttpGet("GetAllByLeaveStructure/{leaveStructureId}")]
        public async Task<ActionResult<IEnumerable<LeaveComponent>>> GetAllByLeaveStructure(int leaveStructureId)
        {
            var leaveComponents = await leaveComponentService.GetAllByLeaveStructure(leaveStructureId);

            return Ok(leaveComponents);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(LeaveComponent leaveComponent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            leaveComponent = await leaveComponentService.InsertAsync(leaveComponent);

            return CreatedAtAction(nameof(Insert), leaveComponent);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(LeaveComponent leaveComponent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await leaveComponentService.UpdateAsync(leaveComponent);

            return Ok(result);
        }
    }
}