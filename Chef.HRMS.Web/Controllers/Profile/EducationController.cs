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
    public class EducationController : ControllerBase
    {
        private readonly IEducationService educationService;

        public EducationController(IEducationService educationService)
        {
            this.educationService = educationService;
        }

        [HttpDelete("Delete/{id}")]

        public async Task<ActionResult<int>> Delete(int id)
        {
            var education = await educationService.GetAsync(id);

            if (education == null)
            {
                return NotFound();
            }

            var result = await educationService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("GetAllByEmployeeId/{id}")]
        public async Task<ActionResult<EducationView>> GetAllByEmployeeId(int id)
        {
            var educationalDetails = await educationService.GetAllByEmployeeId(id);

            if (educationalDetails==null)
            {
                return NotFound();
            }

            return Ok(educationalDetails);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<Education>> Get(int id)
        {
            var educationalDetails = await educationService.GetAsync(id);

            if (educationalDetails == null)
            {
                return NotFound();
            }

            return Ok(educationalDetails);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Education>>> GetAll()
        {
            var educations = await educationService.GetAllAsync();

            return Ok(educations);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(Education education)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await educationService.InsertAsync(education);

            return Ok(id);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(Education education)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await educationService.UpdateAsync(education);

            return Ok(result);
        }
    }
}