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
    [Route("api/profile/[controller]")]
    public class DependentController : ControllerBase
    {
        private readonly IDependentService dependentService;

        public DependentController(IDependentService dependentService)
        {
            this.dependentService = dependentService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var dependent = await dependentService.GetAsync(id);

            if (dependent == null)
            {
                return NotFound();
            }

            var result = await dependentService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("GetByEmployeeId/{id}")]
        public async Task<ActionResult<Dependent>> GetByEmployeeId(int id)
        {
            var dependent = await dependentService.GetAllByEmployeeId(id);

            if (dependent == null)
            {
                return NotFound();
            }

            return Ok(dependent);
        }


        [HttpGet("Get/{id}")]
        public async Task<ActionResult<Education>> Get(int id)
        {
            var dependent = await dependentService.GetAsync(id);

            if (dependent == null)
            {
                return NotFound();
            }

            return Ok(dependent);
        }


        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Dependent>>> GetAll()
        {
            var dependents = await dependentService.GetAllAsync();

            return Ok(dependents);
        }


        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(Dependent dependent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            dependent = await dependentService.InsertAsync(dependent);

            return CreatedAtAction(nameof(Insert), dependent);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(Dependent dependent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await dependentService.UpdateAsync(dependent);

            return Ok(result);
        }
    }
}