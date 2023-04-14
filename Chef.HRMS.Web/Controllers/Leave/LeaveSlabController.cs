using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers.Leave
{
    [Route("api/[controller]")]
    [ApiController]
    public class LeaveSlabController : ControllerBase
    {
        private readonly ILeaveSlabService leaveSlabService;

        public LeaveSlabController(ILeaveSlabService leaveSlabService)
        {
            this.leaveSlabService = leaveSlabService;
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Insert(LeaveSlab leaveSlab)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var slab = await leaveSlabService.InsertAsync(leaveSlab);

            return CreatedAtAction(nameof(Insert), slab);
        }
        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(LeaveSlab slab)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await leaveSlabService.UpdateAsync(slab);

            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<LeaveSlab>>> GetAll()
        {
            var leave = await leaveSlabService.GetAllAsync();

            return Ok(leave);
        }
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var slab = await leaveSlabService.GetAsync(id);

            if (slab == null)
            {
                return NotFound();
            }

            var result = await leaveSlabService.DeleteAsync(id);

            return Ok(result);
        }
    }
}
