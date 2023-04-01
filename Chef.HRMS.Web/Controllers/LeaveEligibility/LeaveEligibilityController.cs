using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveEligibilityController : ControllerBase
    {
        private readonly ILeaveEligibilityService leaveEligibilityService;

        public LeaveEligibilityController(ILeaveEligibilityService leaveEligibilityService)
        {
            this.leaveEligibilityService = leaveEligibilityService;
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(LeaveEligibility leaveEligibility)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var leave = await leaveEligibilityService.InsertAsync(leaveEligibility);

            return CreatedAtAction(nameof(Insert), leave);
        }
        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(LeaveEligibility leaveEligibility)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await leaveEligibilityService.UpdateAsync(leaveEligibility);

            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<LeaveEligibility>>> GetAll()
        {
            var leaveList = await leaveEligibilityService.GetAllAsync();

            return Ok(leaveList);
        }
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var leave = await leaveEligibilityService.GetAsync(id);

            if (leave == null)
            {
                return NotFound();
            }

            var result = await leaveEligibilityService.DeleteAsync(id);

            return Ok(result);
        }
    }
}
