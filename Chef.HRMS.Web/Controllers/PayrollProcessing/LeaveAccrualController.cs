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
public class LeaveAccrualController : ControllerBase
{
    private readonly ILeaveAccrualService leaveAccrualService;

    public LeaveAccrualController(ILeaveAccrualService leaveAccrualService)
    {
        this.leaveAccrualService = leaveAccrualService;
    }

    [AllowAnonymous]
    [HttpPost("GenerateLeaveAccruals/{paygroupid}/{month}/{year}")]
    public async Task<ActionResult<IEnumerable<LeaveAccrual>>> GenerateLeaveAccruals(int paygroupid, int month, int year)
    {
        var leaveAccrualList = await leaveAccrualService.GenerateLeaveAccruals(paygroupid, month, year);

        if (leaveAccrualList == null)
        {
            return NotFound();
        }

        return Ok(leaveAccrualList);
    }

    [HttpPost("GenerateLeaveAccrualsAvailed")]
    public async Task<ActionResult<LeaveAccrual>> GenerateLeaveAccrualsAvailed([FromBody]LeaveAccrual availedLeaveDetails)
    {
        var leaveAccrualList = await leaveAccrualService.GenerateLeaveAvailed(availedLeaveDetails);

        if (leaveAccrualList == null)
        {
            return NotFound();
        }

        return Ok(leaveAccrualList);
    }
}