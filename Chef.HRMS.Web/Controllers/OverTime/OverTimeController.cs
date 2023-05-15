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
    public class OverTimeController : ControllerBase
    {
        private readonly IOverTimeService overTimeService;

        public OverTimeController(IOverTimeService overTimeService)
        {
            this.overTimeService = overTimeService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var overTime = await overTimeService.GetAsync(id);

            if (overTime == null)
            {
                return NotFound();
            }

            var result = await overTimeService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<OverTime>> Get(int id)
        {
            var overTime = await overTimeService.GetAsync(id);

            if (overTime == null)
            {
                return NotFound();
            }

            return Ok(overTime);
        }
        [HttpGet("GetAssignedOverTimePolicy/{employeeId}")]
        public async Task<ActionResult<int>> GetAssignedOverTimePolicy(int employeeId)
        {
            var overTime = await overTimeService.GetAssignedOverTimePolicy(employeeId);

            if (overTime == 0)
            {
                return NotFound();
            }

            return Ok(overTime);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<OverTime>>> GetAll()
        {
            var overTimes = await overTimeService.GetAllAsync();

            return Ok(overTimes);
        }

        [HttpGet("GetAllOvertimeDetailsById/{id}")]
        public async Task<ActionResult<IEnumerable<OverTime>>> GetAllOvertimeDetailsById(int id)
        {
            var overTimes = await overTimeService.GetAllOvertimeDetailsById(id);

            return Ok(overTimes);
        }

       

        [HttpGet("GetOvertimeNotifyPersonnelByOvertimeId/{overtimeId}")]
        public async Task<ActionResult<IEnumerable<OvertimeViewModel>>> GetOvertimeNotifyPersonnelByOvertimeId(int overtimeId)
        {
            var overTimes = await overTimeService.GetOvertimeNotifyPersonnelByOvertimeId(overtimeId);

            return Ok(overTimes);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(OverTime overTime)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await overTimeService.InsertAsync(overTime);

            return Ok(id);

        }

        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(OverTime overTime)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await overTimeService.UpdateAsync(overTime);

            return Ok(result);
        }
        [HttpPost("InsertNotifyPersonnel")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> InsertNotifyPersonnel([FromBody] IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await overTimeService.InsertNotifyPersonnel(overTimeNotifyPersonnel);

            return Ok(result);
        }

        [HttpGet("GetCalenderDetails/{employeeId}")]
        public async Task<ActionResult<IEnumerable<CalenderView>>> GetCalenderDetails(int employeeId)
        {
            var calender = await overTimeService.GetCalenderDetails(employeeId);

            return Ok(calender);
        }

        [HttpPost("UpdateNotifyPersonnel")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> UpdateNotifyPersonnel([FromBody] IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await overTimeService.UpdateNotifyPersonnel(overTimeNotifyPersonnel);

            return Ok(result);
        }
		[HttpGet("GetOvertimeByPaygroupId/")]
		public async Task<ActionResult<IEnumerable<OverTimePayrollViewModel>>> GetOvertimeByPaygroupId(int paygroupId, string fromDate, string toDate)
		{
			var overTimes = await overTimeService.GetOvertimeByPaygroupId(paygroupId, fromDate, toDate);

			return Ok(overTimes);
		}
	}
}