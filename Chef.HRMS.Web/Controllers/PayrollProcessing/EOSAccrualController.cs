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

namespace Chef.HRMS.Web.Controllers;

[Route("api/settings/payrollprocessing/[controller]")]
[ApiController]
public class EOSAccrualController : ControllerBase
{
    private readonly IEOSAccrualService eOSAccrualService;

    public EOSAccrualController(IEOSAccrualService eOSAccrualService)
    {
        this.eOSAccrualService = eOSAccrualService;
    }

    [AllowAnonymous]
    [HttpPost("GenerateEOSAccruals/{paygroupid}")]
    public async Task<ActionResult<IEnumerable<EOSAccrual>>> GenerateEOSAccruals(int paygroupid)
    {
        var eosAccrualList = await eOSAccrualService.GenerateEndOfServiceAccruals(paygroupid);

        if (eosAccrualList == null)
        {
            return NotFound();
        }

        return Ok(eosAccrualList);
    }
}