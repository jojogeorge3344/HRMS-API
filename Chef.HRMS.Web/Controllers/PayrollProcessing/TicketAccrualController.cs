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
    public class TicketAccrualController : ControllerBase
    {
        private readonly ILeaveAccrualService leaveAccrualService;

        public TicketAccrualController(ILeaveAccrualService leaveAccrualService)
        {
            this.leaveAccrualService = leaveAccrualService;
        }

        [AllowAnonymous]
        [HttpPost("GenerateTicketAccruals/{paygroupid}")]
        public async Task<ActionResult<IEnumerable<TicketAccrual>>> GenerateTicketAccruals(int paygroupid)
        {
            List<TicketAccrual> ticketAccrual = new List<TicketAccrual>();            
            return Ok(ticketAccrual);
        }
    }
}