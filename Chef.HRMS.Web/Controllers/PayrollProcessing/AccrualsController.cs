using Chef.Common.Authentication;
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
    public class AccrualsController : ControllerBase
    {
        private readonly ILeaveAccrualService leaveAccrualService;
        private readonly IEOSAccrualService eosAccrualService;
        private readonly ITicketAccrualService ticketAccrualService;

        public AccrualsController(ILeaveAccrualService leaveAccrualService, IEOSAccrualService eosAccrualService, ITicketAccrualService ticketAccrualService)
        {
            this.leaveAccrualService = leaveAccrualService;
            this.eosAccrualService = eosAccrualService;
            this.ticketAccrualService = ticketAccrualService;
        }

        [AllowAnonymous]
        [HttpPost("SaveAccruals/{payrollprocessingId}")]
        public async Task<ActionResult<LeaveAccrual>> SaveAccruals(int payrollprocessingmethod)
        {
            //var leaveAccrualList = await leaveAccrualService.GenerateLeaveAccruals(paygroupid);

            //if (leaveAccrualList == null)
            //{
            //    return NotFound();
            //}

            return Ok();
        }

        [HttpPost("GenerateFinancialEntry/{payrollprocessingId}")]
        public async Task<ActionResult<LeaveAccrual>> GenerateFinancialEntry(int payrollProcessingId)
        {
            //var leaveAccrualList = await leaveAccrualService.GenerateLeaveAvailed(availedLeaveDetails);

            //if (leaveAccrualList == null)
            //{
            //    return NotFound();
            //}

            return Ok();
        }
    }
}