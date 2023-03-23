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
    public class JobDetailsController : ControllerBase
    {
        private readonly IJobDetailsService jobDetailsService;

        public JobDetailsController(IJobDetailsService jobDetailsService)
        {
            this.jobDetailsService = jobDetailsService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var jobDetails = await jobDetailsService.GetAsync(id);

            if (jobDetails == null)
            {
                return NotFound();
            }

            var result = await jobDetailsService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<JobDetails>> Get(int id)
        {
            var jobDetailsDetails = await jobDetailsService.GetAsync(id);

            if (jobDetailsDetails == null)
            {
                return NotFound();
            }

            return Ok(jobDetailsDetails);
        }      

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<JobDetails>>> GetAll()
        {
            var jobDetailsList = await jobDetailsService.GetAllAsync();

            return Ok(jobDetailsList);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(JobDetails jobDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var jobDetailss = await jobDetailsService.InsertAsync(jobDetails);

            return CreatedAtAction(nameof(Insert), jobDetailss);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(JobDetails jobDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await jobDetailsService.UpdateAsync(jobDetails);

            return Ok(result);
        }
        [HttpGet("GetGroupCategory")]
        public async Task<ActionResult<IEnumerable<GroupCategory>>> GetGroupCategory()
        {
            var categoryList = await jobDetailsService.GetGroupCategory();

            return Ok(categoryList);
        }

    }
}