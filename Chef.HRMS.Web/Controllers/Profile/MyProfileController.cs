using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MyProfileController : ControllerBase
    {
        private readonly IMyProfileService myProfileService;

        public MyProfileController(IMyProfileService myProfileService)
        {
            this.myProfileService = myProfileService;
        }

        [HttpGet("GetMyProfileDetails/{employeeId}")]
        public async Task<ActionResult<MyProfileView>> GetMyProfileDetails(int employeeId)
        {
            var userProfileDetails = await myProfileService.GetMyProfileDetailsAsync(employeeId);

            if (userProfileDetails == null)
            {
                return NotFound();
            }

            return Ok(userProfileDetails);
        }
    }
}