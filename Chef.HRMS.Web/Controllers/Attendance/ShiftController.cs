using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/attendance/[controller]")]
    [ApiController]
    public class ShiftController : ControllerBase
    {
        private readonly IShiftService shiftService;

        public ShiftController(IShiftService shiftService)
        {
            this.shiftService = shiftService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var shift = await shiftService.GetAsync(id);

            if (shift == null)
            {
                return NotFound();
            }

            var result = await shiftService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Shift>>> GetAll()
        {
            var shifts = await shiftService.GetAllAsync();

            return Ok(shifts);
        }

        [HttpGet("GetAllAssignedShift")]
        public async Task<ActionResult<IEnumerable<int>>> GetAllAssignedShift()
        {
            var shifts = await shiftService.GetAllAssignedShift();

            return Ok(shifts);
        }

        [HttpGet("GetShiftByEmployeeId/{id}")]
        public async Task<ActionResult<Shift>> GetShiftByEmployeeId(int id)
        {
            var shifts = await shiftService.GetShiftByEmployeeId(id);

            return Ok(shifts);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Insert(Shift shift)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await shiftService.InsertAsync(shift);

            return Ok(id);

        }

        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(Shift shift)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await shiftService.UpdateAsync(shift);

            return Ok(result);
        }
    }
}