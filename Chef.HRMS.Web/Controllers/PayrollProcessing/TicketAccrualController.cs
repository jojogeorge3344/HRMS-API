using Chef.Common.Authentication;
using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using Chef.HRMS.Services;
using Chef.HRMS.Services.PayrollProcessing.Interface;
using Chef.HRMS.Services.PayrollProcessing.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/settings/payrollprocessing/[controller]")]
[ApiController]
public class TicketAccrualController : ControllerBase
{
    private readonly ITicketAccrualService ticketAccrualService;

    public TicketAccrualController(ITicketAccrualService ticketAccrualService)
    {
        this.ticketAccrualService = ticketAccrualService;
    }

    [AllowAnonymous]
    [HttpPost("GenerateTicketAccruals/{paygroupid}")]
    public async Task<ActionResult<IEnumerable<TicketAccrual>>> GenerateTicketAccruals(int paygroupid)
    {
        var ticketAccrualList = await ticketAccrualService.GenerateTicketAccruals(paygroupid);

        if (ticketAccrualList == null)
        {
            return NotFound();
        }
        return Ok(ticketAccrualList);
    }
}