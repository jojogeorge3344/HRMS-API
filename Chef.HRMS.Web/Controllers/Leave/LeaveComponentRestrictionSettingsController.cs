using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/leave/[controller]")]
    [ApiController]
    public class LeaveComponentRestrictionSettingsController : ControllerBase
    {
        private readonly ILeaveComponentRestrictionSettingsService leaveComponentRestrictionSettingsService;

        public LeaveComponentRestrictionSettingsController(ILeaveComponentRestrictionSettingsService leaveComponentRestrictionSettingsService)
        {
            this.leaveComponentRestrictionSettingsService = leaveComponentRestrictionSettingsService;
        }

        [HttpGet("Get/leaveStructureId/{leaveStructureId}/leaveComponentId/{leaveComponentId}")]
        public async Task<ActionResult<LeaveComponentRestrictionSettings>> Get(int leaveStructureId, int leaveComponentId)
        {
            var leaveComponentRestrictionSettings = await leaveComponentRestrictionSettingsService.GetAsync(leaveStructureId, leaveComponentId);

            if (leaveComponentRestrictionSettings == null)
            {
                leaveComponentRestrictionSettings = new LeaveComponentRestrictionSettings()
                {
                    LeaveStructureId = leaveStructureId,
                    LeaveComponentId = leaveComponentId,
                };
            }

            return Ok(leaveComponentRestrictionSettings);
        }

        [HttpDelete("Delete/leaveStructureId/{leaveStructureId}/leaveComponentId/{leaveComponentId}")]
        public async Task<ActionResult<int>> Delete(int leaveStructureId, int leaveComponentId)
        {
            var leaveComponentRestrictionSettings = await leaveComponentRestrictionSettingsService.DeleteAsync(leaveStructureId, leaveComponentId);

            return Ok(leaveComponentRestrictionSettings);
        }
        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(LeaveComponentRestrictionSettings leaveComponentRestrictionSettings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await leaveComponentRestrictionSettingsService.InsertOrUpdateAsync(leaveComponentRestrictionSettings);

            return Ok(result);
        }
    }
}