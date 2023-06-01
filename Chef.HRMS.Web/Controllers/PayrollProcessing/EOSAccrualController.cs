using Chef.Common.Authentication;
using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
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
    public class EOSAccrualController : ControllerBase
    {
        private readonly ILeaveAccrualService leaveAccrualService;

        public EOSAccrualController(ILeaveAccrualService leaveAccrualService)
        {
            this.leaveAccrualService = leaveAccrualService;
        }

        [AllowAnonymous]
        [HttpPost("GenerateEOSAccruals/{paygroupid}")]
        public async Task<ActionResult<EOSAccrual>> GenerateEOSAccruals(int paygroupid)
        {
            EOSAccrual eosAccrual = new EOSAccrual();            
            
            // var leaveAccrualList = await leaveAccrualService.GenerateLeaveAccruals(paygroupid);


            // if (leaveAccrualList == null)
            // {
            //     return NotFound();
            // }

            return Ok(eosAccrual);
        }
    }
}