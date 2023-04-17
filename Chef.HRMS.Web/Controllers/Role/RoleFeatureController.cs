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
    [Route("api/settings/[controller]")]
    public class RoleFeatureController : ControllerBase
    {
        private readonly IRoleFeatureService roleFeatureService;

        public RoleFeatureController(IRoleFeatureService roleFeatureService)
        {
            this.roleFeatureService = roleFeatureService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var roleFeature = await roleFeatureService.GetAsync(id);

            if (roleFeature == null)
            {
                return NotFound();
            }

            var result = await roleFeatureService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<RoleFeature>> Get(int id)
        {
            var roleFeature = await roleFeatureService.GetAsync(id);

            if (roleFeature == null)
            {
                return NotFound();
            }

            return Ok(roleFeature);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<RoleFeature>>> GetAll()
        {
            var roleFeaturees = await roleFeatureService.GetAllAsync();

            return Ok(roleFeaturees);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("InsertSingle")]
        public async Task<IActionResult> Insert(RoleFeature roleFeature)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id  = await roleFeatureService.InsertAsync(roleFeature);

            return Ok(id);
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> AssignRoleFeature(IEnumerable<RoleFeature> roleFeature)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await roleFeatureService.AssignRoleFeature(roleFeature);

            return Ok(result);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(RoleFeature RoleFeature)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await roleFeatureService.UpdateAsync(RoleFeature);

            return Ok(result);
        }
    }
}