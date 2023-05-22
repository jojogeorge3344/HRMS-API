using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Services.PayrollProcessing.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/payrollprocessing/[controller]")]
    [ApiController]
    public class LeaveAccrualController : ControllerBase
    {
        private readonly ILeaveAccrualService leaveAccrualService;

        public LeaveAccrualController(ILeaveAccrualService leaveAccrualService)
        {
            this.leaveAccrualService = leaveAccrualService;
        }


        [HttpPost("GenerateLeaveAccruals/{payrollprocessid}/{isavail}")]
        public async Task<ActionResult<LeaveAccrual>> GenerateLeaveAccruals(int payrollprocessid, bool isavail)
        {
            var leaveAndAttendanceList = await leaveAccrualService.GenerateLeaveAccruals(isavail);

            if (leaveAndAttendanceList == null)
            {
                return NotFound();
            }

            return Ok(leaveAndAttendanceList);
        }
    }
}