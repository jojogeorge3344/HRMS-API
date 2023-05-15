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
    public class LeaveController : ControllerBase
    {
        private readonly ILeaveService leaveService;

        public LeaveController(ILeaveService leaveService)
        {
            this.leaveService = leaveService;
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<Chef.HRMS.Models.Leave>> Get(int id)
        {
            var leave = await leaveService.GetAsync(id);

            if (leave == null)
            {
                return NotFound();
            }

            return Ok(leave);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Chef.HRMS.Models.Leave>>> GetAll()
        {
            var leaves = await leaveService.GetAllAsync();

            return Ok(leaves);
        }

        [HttpGet("GetAllLeaveBalanceById/{id}")]
        public async Task<ActionResult<IEnumerable<LeaveComponentLeaveBalanceViewModel>>> GetAllLeaveBalanceById(int id)
        {
            var leaves = await leaveService.GetAllLeaveBalanceById(id);

            return Ok(leaves);
        }


        [HttpGet("GetAllLeaveInfoByEmployeeId/{employeeid}")]
        public async Task<ActionResult<IEnumerable<Chef.HRMS.Models.Leave>>> GetAllLeaveInfoByEmployeeId(int employeeid)
        {
            var leaves = await leaveService.GetAllLeaveInfoByEmployeeId(employeeid);

            return Ok(leaves);
        }

        [HttpGet("GetApproverById/{leaveRequestId}")]
        public async Task<ActionResult<IEnumerable<LeaveNotificationView>>> GetApproverById(int leaveRequestId)
        {
            var leaves = await leaveService.GetApproverById(leaveRequestId);

            return Ok(leaves);
        }
        [HttpGet("GetAllUnApprovedLeaveById/{employeeId}")]
        public async Task<ActionResult<IEnumerable<Chef.HRMS.Models.Leave>>> GetAllUnApprovedLeaveById(int employeeId)
        {
            var leaves = await leaveService.GetAllUnApprovedLeaveById(employeeId);

            return Ok(leaves);
        }
        [HttpGet("GetAllNotifyPersonnelById/{leaveRequestId}")]
        public async Task<ActionResult<IEnumerable<LeaveNotifyPersonnel>>> GetAllNotifyPersonnelById(int leaveRequestId)
        {
            var leaves = await leaveService.GetAllNotifyPersonnelById(leaveRequestId);

            return Ok(leaves);
        }

        [HttpGet("GetAllLeaveDetailsById/{id}")]
        public async Task<ActionResult<IEnumerable<Chef.HRMS.Models.Leave>>> GetAllLeaveDetailsById(int id)
        {
            var leaves = await leaveService.GetAllLeaveDetailsById(id);

            return Ok(leaves);
        }

        [HttpGet("GetAllLeaveSettingsById/{id}")]
        public async Task<ActionResult<IEnumerable<LeaveSettingsViewModel>>> GetAllLeaveSettingsById(int id)
        {
            var leaveSettings = await leaveService.GetAllLeaveSettingsById(id);

            if (leaveSettings == null)
            {
                return NotFound();
            }

            return Ok(leaveSettings);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(Chef.HRMS.Models.Leave leave)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await leaveService.InsertAsync(leave);

            return Ok(id);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(Chef.HRMS.Models.Leave leave)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await leaveService.UpdateAsync(leave);

            return Ok(result);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var leave = await leaveService.GetAsync(id);

            if (leave == null)
            {
                return NotFound();
            }

            var result = await leaveService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpPost("InsertNotifyPersonnel")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> InsertNotifyPersonnel([FromBody] IEnumerable<LeaveNotifyPersonnel> LeaveNotifyPersonnel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await leaveService.InsertNotifyPersonnel(LeaveNotifyPersonnel);

            return Ok(result);
        }

        [HttpPost("UpdateNotifyPersonnel")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> UpdateNotifyPersonnel([FromBody] IEnumerable<LeaveNotifyPersonnel> LeaveNotifyPersonnel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await leaveService.UpdateNotifyPersonnel(LeaveNotifyPersonnel);

            return Ok(result);
        }

        [HttpPost("InsertUnmarkedAttendance")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertUnmarkedAttendance(IEnumerable<Chef.HRMS.Models.Leave> leaves)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await leaveService.InsertUnmarkedAttendance(leaves);

            return Ok(result);
        }
        [HttpGet("GetAllLeaveDetails")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<IEnumerable<Chef.HRMS.Models.Leave>>> GetAllLeaveDetails()
        {

            var result = await leaveService.GetAllLeaveDetails();

            return Ok(result);
        }
    }
}
