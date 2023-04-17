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
    public class EmployeeDefaultController : ControllerBase
    {
        private readonly IEmployeeDefaultsServices employeeDefaultsServices;

        public EmployeeDefaultController(IEmployeeDefaultsServices employeeDefaultsServices)
        {
            this.employeeDefaultsServices = employeeDefaultsServices;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var JobTitle = await employeeDefaultsServices.GetAsync(id);

            if (JobTitle == null)
            {
                return NotFound();
            }

            var result = await employeeDefaultsServices.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<EmployeeDefaults>> Get(int id)
        {
            var JobTitle = await employeeDefaultsServices.GetAsync(id);

            if (JobTitle == null)
            {
                return NotFound();
            }

            return Ok(JobTitle);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<EmployeeDefaults>>> GetAll()
        {
            var JobTitles = await employeeDefaultsServices.GetAllAsync();

            return Ok(JobTitles);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(EmployeeDefaults employeeDefault)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await employeeDefaultsServices.InsertAsync(employeeDefault);

            return Ok(id);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(EmployeeDefaults employeeDefault)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await employeeDefaultsServices.UpdateAsync(employeeDefault);

            return Ok(result);
        }
    }
}