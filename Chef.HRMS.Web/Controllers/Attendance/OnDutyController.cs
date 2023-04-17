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
    [Route("api/Attendance/[controller]")]
    public class OnDutyController : ControllerBase
    {
        private readonly IOnDutyService onDutyService;

        public OnDutyController(IOnDutyService onDutyService)
        {
            this.onDutyService = onDutyService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var onDuty = await onDutyService.GetAsync(id);

            if (onDuty == null)
            {
                return NotFound();
            }

            var result = await onDutyService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<OnDuty>> Get(int id)
        {
            var onDuty = await onDutyService.GetAsync(id);

            if (onDuty == null)
            {
                return NotFound();
            }

            return Ok(onDuty);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<OnDuty>>> GetAll()
        {
            var onDuties = await onDutyService.GetAllAsync();

            return Ok(onDuties);
        }

        [HttpGet("GetJoinDateByEmployeeId/{employeeid}")]
        public async Task<ActionResult<IEnumerable<JobDetails>>> GetJoinDateByEmployeeId(int employeeid)
        {
            var onDuties = await onDutyService.GetJoinDateByEmployeeId(employeeid);

            return Ok(onDuties);
        }

        [HttpGet("GetTotalRequestedDaysById/{id}")]
        public async Task<ActionResult<IEnumerable<OnDuty>>> GetTotalRequestedDaysById(int id)
        {
            var onDuties = await onDutyService.GetTotalRequestedDaysById(id);

            return Ok(onDuties);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(OnDuty onDuty)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await onDutyService.InsertAsync(onDuty);

            return Ok(id);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(OnDuty onDuty)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await onDutyService.UpdateAsync(onDuty);

            return Ok(result);
        }
        [HttpPost("InsertNotifyPersonnel")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> InsertNotifyPersonnel(IEnumerable<OnDutyNotifyPersonnel> onDutyNotifyPersonnel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await onDutyService.InsertNotifyPersonnel(onDutyNotifyPersonnel);

            return Ok(result);
        }
    }
}