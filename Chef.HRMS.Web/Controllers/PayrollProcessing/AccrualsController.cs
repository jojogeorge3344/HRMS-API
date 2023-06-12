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

        private readonly ILeaveAccrualSummaryService leaveAccrualSummaryService;

        public AccrualsController(ILeaveAccrualService leaveAccrualService,ILeaveAccrualSummaryService leaveAccrualSummaryService,
            IEOSAccrualService eosAccrualService, ITicketAccrualService ticketAccrualService)
        {
            this.leaveAccrualService = leaveAccrualService;
            this.eosAccrualService = eosAccrualService;
            this.ticketAccrualService = ticketAccrualService;

            this.leaveAccrualSummaryService = leaveAccrualSummaryService;
        }

        [AllowAnonymous]
        [HttpPost("SaveAccruals")]
        public async Task<ActionResult<int>> SaveAccruals([FromBody]Accruals accrualsList)
        {
            int result = 0;
            result = await leaveAccrualService.InsertLeaveAccruals(accrualsList.LeaveAccruals);

            if (result > 0)
            {
                result = await leaveAccrualSummaryService.GenerateAndInsertLeaveAccrualSummary(accrualsList.LeaveAccruals);
            }

           // result = await eosAccrualService.SaveEOSAccruals(accrualsList.EOSAccruals);
           // result = await ticketAccrualService.SaveTicketAccruals(accrualsList.TicketAccruals);

            return Ok(result);
        }

        [HttpPost("GenerateFinancialEntry/{paygroupId}")]
        public async Task<ActionResult<int>> GenerateFinancialEntry(int paygroupId)
        {

            int i = 0;
            //var leaveAccrualList = await leaveAccrualService.GenerateLeaveAvailed(availedLeaveDetails);

            //if (leaveAccrualList == null)
            //{
            //    return NotFound();
            //}

            return Ok(i);
        }

        [HttpPost("GetProcessedAccruals/{paygroupId}")]
        public async Task<ActionResult<Accruals>> GetProcessedAccruals(int paygroupId)
        {
            Accruals accruals = new Accruals();
            accruals.LeaveAccruals = await leaveAccrualService.GetGeneratedLeaveAccruals(paygroupId); 

            if (accruals == null)
            {
                return NotFound();
            }
            return Ok(accruals);
        }
    }
}