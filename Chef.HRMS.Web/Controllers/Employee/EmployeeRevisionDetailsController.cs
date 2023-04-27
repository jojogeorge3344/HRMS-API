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
    public class EmployeeRevisionDetailsController : ControllerBase
    {
        private readonly IEmployeeRevisionDetailsService employeeRevisionDetailsService;

        public EmployeeRevisionDetailsController(IEmployeeRevisionDetailsService employeeRevisionDetailsService)
        {
            this.employeeRevisionDetailsService = employeeRevisionDetailsService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var EmployeeRevisionDetails = await employeeRevisionDetailsService.GetAsync(id);

            if (EmployeeRevisionDetails == null)
            {
                return NotFound();
            }

            var result = await employeeRevisionDetailsService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<EmployeeRevisionDetails>> Get(int id)
        {
            var EmployeeRevisionDetails = await employeeRevisionDetailsService.GetAsync(id);

            if (EmployeeRevisionDetails == null)
            {
                return NotFound();
            }

            return Ok(EmployeeRevisionDetails);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<EmployeeRevisionDetails>>> GetAll()
        {
            return Ok(await employeeRevisionDetailsService.GetAllAsync());
        }

     
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(EmployeeRevisionDetails employeeRevisionDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employeeRev = await employeeRevisionDetailsService.InsertAsync(employeeRevisionDetails);
            return CreatedAtAction(nameof(Insert), employeeRev);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(EmployeeRevisionDetails EmployeeRevisionDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await employeeRevisionDetailsService.UpdateAsync(EmployeeRevisionDetails);

            return Ok(result);
        }
    }
}