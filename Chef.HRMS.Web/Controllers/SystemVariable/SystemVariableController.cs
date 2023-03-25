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
    public class SystemVariableController : ControllerBase
    {
        private readonly ISystemVariableService systemVariableService;

        public SystemVariableController(ISystemVariableService systemVariableService)
        {
            this.systemVariableService = systemVariableService;
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(SystemVariable systemVariable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var systemVariableDetails = await systemVariableService.InsertAsync(systemVariable);

            return CreatedAtAction(nameof(Insert), systemVariableDetails);
        }
        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(SystemVariable systemVariable)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await systemVariableService.UpdateAsync(systemVariable);

            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<SystemVariable>>> GetAll()
        {
            var userList = await systemVariableService.GetAllAsync();

            return Ok(userList);
        }
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var userVariabledelete = await systemVariableService.GetAsync(id);

            if (userVariabledelete == null)
            {
                return NotFound();
            }

            var result = await systemVariableService.DeleteAsync(id);

            return Ok(result);
        }
    }
}
