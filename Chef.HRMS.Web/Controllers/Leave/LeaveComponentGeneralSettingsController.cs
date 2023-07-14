using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[ApiController]
[Route("api/settings/leave/[controller]")]
public class LeaveComponentGeneralSettingsController : ControllerBase
{
    private readonly ILeaveComponentGeneralSettingsService leaveComponentGeneralSettingsService;

    public LeaveComponentGeneralSettingsController(ILeaveComponentGeneralSettingsService leaveComponentGeneralSettingsService)
    {
        this.leaveComponentGeneralSettingsService = leaveComponentGeneralSettingsService;
    }

    [HttpGet("Get/leaveStructureId/{leaveStructureId}/leaveComponentId/{leaveComponentId}")]
    public async Task<ActionResult<LeaveComponentGeneralSettings>> Get(int leaveStructureId, int leaveComponentId)
    {
        var leaveGeneralSettings = await leaveComponentGeneralSettingsService.GetAsync(leaveStructureId, leaveComponentId);

        if (leaveGeneralSettings == null)
        {
            leaveGeneralSettings = new LeaveComponentGeneralSettings()
            {
                AllocateLeaveQuotaAt = 1,
                BalanceRoundOff = 1,
                LeaveBalancesAtTheYearEnd = 1,
                NegativeLeaveBalancesAtTheYearEnd = 1,
                LeaveStructureId = leaveStructureId,
                LeaveComponentId = leaveComponentId
            };
        }

        return Ok(leaveGeneralSettings);
    }

    [HttpDelete("Delete/leaveStructureId/{leaveStructureId}/leaveComponentId/{leaveComponentId}")]
    public async Task<ActionResult<int>> Delete(int leaveStructureId, int leaveComponentId)
    {
        var leaveGeneralSettings = await leaveComponentGeneralSettingsService.DeleteAsync(leaveStructureId, leaveComponentId);

        return Ok(leaveGeneralSettings);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(LeaveComponentGeneralSettings leaveComponentGeneralSettings)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await leaveComponentGeneralSettingsService.InsertOrUpdateAsync(leaveComponentGeneralSettings);

        return Ok(result);
    }
}