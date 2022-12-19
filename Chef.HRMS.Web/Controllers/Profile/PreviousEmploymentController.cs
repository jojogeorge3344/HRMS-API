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
    public class PreviousEmploymentController : ControllerBase
    {
        private readonly IPreviousEmploymentService previousEmploymentService;

        public PreviousEmploymentController(IPreviousEmploymentService previousEmploymentService)
        {
            this.previousEmploymentService = previousEmploymentService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var previousEmployment = await previousEmploymentService.GetAsync(id);

            if (previousEmployment == null)
            {
                return NotFound();
            }

            var result = await previousEmploymentService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PreviousEmployment>> Get(int id)
        {
            var previousEmployment = await previousEmploymentService.GetAsync(id);

            if (previousEmployment == null)
            {
                return NotFound();
            }

            return Ok(previousEmployment);
        }

        [HttpGet("GetByEmployeeId/{id}")]
        public async Task<ActionResult<PreviousEmploymentView>> GetByEmployeeId(int id)
        {
            var previousEmployment = await previousEmploymentService.GetByEmployeeId(id);

            if (previousEmployment == null)
            {
                return NotFound();
            }

            return Ok(previousEmployment);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PreviousEmployment>>> GetAll()
        {
            var previousEmployments = await previousEmploymentService.GetAllAsync();

            return Ok(previousEmployments);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(PreviousEmployment previousEmployment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await previousEmploymentService.InsertAsync(previousEmployment);

            return Ok(id);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(PreviousEmployment previousEmployment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await previousEmploymentService.UpdateAsync(previousEmployment);

            return Ok(result);
        }
    }
}