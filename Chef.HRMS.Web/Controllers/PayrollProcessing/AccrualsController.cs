using Chef.Common.Authentication;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Services.PayrollProcessing.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/settings/payrollprocessing/[controller]")]
[ApiController]
public class AccrualsController : ControllerBase
{
    private readonly ILeaveAccrualService leaveAccrualService;
    private readonly IEOSAccrualService eosAccrualService;
    private readonly ITicketAccrualService ticketAccrualService;
    private readonly IAccrualService accrualService;

    public AccrualsController(
        ILeaveAccrualService leaveAccrualService,
        IEOSAccrualService eosAccrualService,
        ITicketAccrualService ticketAccrualService,
        IAccrualService accrualService)
    {
        this.leaveAccrualService = leaveAccrualService;
        this.eosAccrualService = eosAccrualService;
        this.ticketAccrualService = ticketAccrualService;
        this.accrualService = accrualService;
    }

    [AllowAnonymous]
    [HttpPost("SaveAccruals")]
    public async Task<ActionResult<int>> SaveAccruals([FromBody]Accruals accrualsList)
    {
        var result = await accrualService.SaveAccruals(accrualsList);
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

    [HttpGet("GetProcessedAccruals/{payrollprocessid}")]
    public async Task<ActionResult<Accruals>> GetProcessedAccruals(int payrollprocessid)
    {
        Accruals accruals = new Accruals();
        accruals.LeaveAccruals = await leaveAccrualService.GetGeneratedLeaveAccruals(payrollprocessid); 
        accruals.EOSAccruals = await eosAccrualService.GetGeneratedEOSAccruals(payrollprocessid);
        accruals.TicketAccruals = await ticketAccrualService.GetGeneratedTicketAccruals(payrollprocessid);
        if (accruals == null)
        {
            return NotFound();
        }
        return Ok(accruals);
    }

    [HttpGet("GetProcessedAccrualsPrint/{payrollprocessid}")]
    public async Task<ActionResult<Accruals>> GetProcessedAccrualsPrint(int payrollprocessid)
    {
        var result = await leaveAccrualService.GetAccrualsByPayrollProcessingId(payrollprocessid);
        if (result == null)
        {
            return NotFound();
        }
        return Ok(result);
    }

}