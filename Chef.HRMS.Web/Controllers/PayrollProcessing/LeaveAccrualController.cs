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


        [HttpPost("GenerateLeaveAccruals/{paygroupid}/{isavail}")]
        public async Task<ActionResult<LeaveAccrual>> GenerateLeaveAccruals(int paygroupid, bool isavail)
        {
            var leaveAccrualList = await leaveAccrualService.GenerateLeaveAccruals(paygroupid, isavail);

            if (leaveAccrualList == null)
            {
                return NotFound();
            }

            return Ok(leaveAccrualList);
        }
    }
}