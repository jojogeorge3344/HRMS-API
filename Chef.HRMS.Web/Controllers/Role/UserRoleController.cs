using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [ApiController]
    [Route("api/settings/Roles/[controller]")]
    public class UserRoleController : ControllerBase
    {
        private readonly IUserRoleService userRoleService;

        public UserRoleController(IUserRoleService userRoleService)
        {
            this.userRoleService = userRoleService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var userRole = await userRoleService.GetAsync(id);

            if (userRole == null)
            {
                return NotFound();
            }

            var result = await userRoleService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<UserRole>> Get(int id)
        {
            var userRole = await userRoleService.GetAsync(id);

            if (userRole == null)
            {
                return NotFound();
            }

            return Ok(userRole);
        }

        [HttpGet("GetUserRole/{userId}")]
        public async Task<ActionResult<IEnumerable<UserRoleView>>> GetUserRole(string userId)
        {
            var userRolees = await userRoleService.GetUserRole(userId);

            return Ok(userRolees);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<UserRole>>> GetAll()
        {
            var userRolees = await userRoleService.GetAllAsync();

            return Ok(userRolees);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(UserRole userRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await userRoleService.InsertAsync(userRole);

            return Ok(id);
        }
        [HttpPost("GroupInsert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> AssignRolesToUser(IEnumerable<UserRole> userRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await userRoleService.AssignRolesToUser(userRole);

            return Ok(result);
        }
        [HttpPut("UpdateUserRoleGroup")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> UpdateUserRoleGroup(int roleId, IEnumerable<UserRole> userRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await userRoleService.UpdateUserRoleGroup(roleId, userRole);

            return Ok(result);
        }
        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(UserRole UserRole)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await userRoleService.UpdateAsync(UserRole);

            return Ok(result);
        }
    }
}