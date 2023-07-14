using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Chef.HRMS.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/settings/leave/[controller]")]
[ApiController]
public class LeaveStructureLeaveComponentController : ControllerBase
{
    private readonly ILeaveStructureLeaveComponentService leaveStructureLeaveComponentService;

    public LeaveStructureLeaveComponentController(ILeaveStructureLeaveComponentService leaveStructureLeaveComponentService)
    {
        this.leaveStructureLeaveComponentService = leaveStructureLeaveComponentService;
    }

    [HttpGet("GetAll/{leaveStructureId}")]
    public async Task<ActionResult<LeaveStructureLeaveComponent>> GetAll(int leaveStructureId)
    {
        var leaveStructureTypes = await leaveStructureLeaveComponentService.GetAllAsync(leaveStructureId);

        if (leaveStructureTypes == null)
        {
            return NotFound();
        }

        return Ok(leaveStructureTypes);
    }


    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Update(LeaveStructureLeaveComponentViewModel leaveStructureLeaveComponentUpdateModel)
    {
        var result = await leaveStructureLeaveComponentService.UpdateAsync(leaveStructureLeaveComponentUpdateModel.LeaveStructureId, leaveStructureLeaveComponentUpdateModel.LeaveStructureLeaveComponents);
        return Ok(result);
    }

    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Insert(LeaveStructureLeaveComponentViewModel leaveStructureLeaveComponentUpdateModel)
    {
        var result = await leaveStructureLeaveComponentService.InsertAsync(leaveStructureLeaveComponentUpdateModel.LeaveStructureId, leaveStructureLeaveComponentUpdateModel.LeaveStructureLeaveComponents, leaveStructureLeaveComponentUpdateModel.RemoveLeaveStructureLeaveComponents);
        return Ok(result);
    }

    [HttpPost("Delete")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Delete(LeaveStructureLeaveComponent leaveStructureLeaveComponent)
    {
        var result = await leaveStructureLeaveComponentService.DeleteAsync(leaveStructureLeaveComponent);
        return Ok(result);
    }
}