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

namespace Chef.HRMS.Web.Controllers;

[Route("api/settings/payrollprocessing/[controller]")]
[ApiController]
public class AccrualsController : ControllerBase
{
    private readonly ILeaveAccrualService leaveAccrualService;
    private readonly IEOSAccrualService eosAccrualService;
    private readonly ITicketAccrualService ticketAccrualService;

    private readonly ILeaveAccrualSummaryService leaveAccrualSummaryService;
    private readonly IEOSAccrualSummaryService eosAccrualSummaryService;
    private readonly ITicketAccrualSummaryService ticketAccrualSummaryService;

    public AccrualsController(ILeaveAccrualService leaveAccrualService,ILeaveAccrualSummaryService leaveAccrualSummaryService,
        IEOSAccrualService eosAccrualService, ITicketAccrualService ticketAccrualService)
    {
        this.leaveAccrualService = leaveAccrualService;
        this.eosAccrualService = eosAccrualService;
        this.ticketAccrualService = ticketAccrualService;

        this.leaveAccrualSummaryService = leaveAccrualSummaryService;
        this.leaveAccrualSummaryService = leaveAccrualSummaryService;
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

        result = await eosAccrualService.InsertEOSAccruals(accrualsList.EOSAccruals);
        if (result > 0)
        {
            result = await eosAccrualSummaryService.GenerateAndInsertEOSAccrualSummary(accrualsList.EOSAccruals);
        }

        result = await ticketAccrualService.InsertTicketAccruals(accrualsList.TicketAccruals);
        if (result > 0)
        {
            result = await ticketAccrualSummaryService.GenerateAndInsertTicketAccrualSummary(accrualsList.TicketAccruals);
        }
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