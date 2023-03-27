using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;


namespace Chef.HRMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserVariableController : ControllerBase
    {
        private readonly IUserVariableService userVariableService;

        public UserVariableController(IUserVariableService userVariableService)
        {
            this.userVariableService = userVariableService;
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(UserVariable uservariables)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userVariableDetails = await userVariableService.InsertAsync(uservariables);

            return CreatedAtAction(nameof(Insert), userVariableDetails);
        }
        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(UserVariable userVariable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await userVariableService.UpdateAsync(userVariable);

            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<UserVariable>>> GetAll()
        {
            var religionList = await userVariableService.GetAllAsync();

            return Ok(religionList);
        }
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var religiondelete = await userVariableService.GetAsync(id);

            if (religiondelete == null)
            {
                return NotFound();
            }

            var result = await userVariableService.DeleteAsync(id);

            return Ok(result);
        }
    }
}
