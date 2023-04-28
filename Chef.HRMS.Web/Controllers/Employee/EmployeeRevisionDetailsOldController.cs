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
    public class EmployeeRevisionDetailsOldController : ControllerBase
    {
        private readonly IEmployeeRevisionDetailsOldService employeeRevisionDetailsOldService;

        public EmployeeRevisionDetailsOldController(IEmployeeRevisionDetailsOldService employeeRevisionDetailsOldService)
        {
            this.employeeRevisionDetailsOldService = employeeRevisionDetailsOldService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var EmployeeRevisionDetailsOld = await employeeRevisionDetailsOldService.GetAsync(id);

            if (EmployeeRevisionDetailsOld == null)
            {
                return NotFound();
            }

            var result = await employeeRevisionDetailsOldService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<EmployeeRevisionDetailsOld>> Get(int id)
        {
            var EmployeeRevisionDetailsOld = await employeeRevisionDetailsOldService.GetAsync(id);

            if (EmployeeRevisionDetailsOld == null)
            {
                return NotFound();
            }

            return Ok(EmployeeRevisionDetailsOld);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<EmployeeRevisionDetailsOld>>> GetAll()
        {
            return Ok(await employeeRevisionDetailsOldService.GetAllAsync());
        }

     
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(EmployeeRevisionDetailsOld employeeRevisionDetailsOld)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employeeRev = await employeeRevisionDetailsOldService.InsertAsync(employeeRevisionDetailsOld);
            return CreatedAtAction(nameof(Insert), employeeRev);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(EmployeeRevisionDetailsOld EmployeeRevisionDetailsOld)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await employeeRevisionDetailsOldService.UpdateAsync(EmployeeRevisionDetailsOld);

            return Ok(result);
        }
    }
}