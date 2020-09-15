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
    public class JobFilingController : ControllerBase
    {
        private readonly IJobFilingService jobFilingService;

        public JobFilingController(IJobFilingService jobFilingService)
        {
            this.jobFilingService = jobFilingService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var jobFiling = await jobFilingService.GetAsync(id);

            if (jobFiling == null)
            {
                return NotFound();
            }

            var result = await jobFilingService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<JobFiling>> Get(int id)
        {
            var jobFilingDetails = await jobFilingService.GetAsync(id);

            if (jobFilingDetails == null)
            {
                return NotFound();
            }

            return Ok(jobFilingDetails);
        }

        [HttpGet("GetWeekendPolicyById/{id}")]
        public async Task<ActionResult<int>> GetWeekendPolicyById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await jobFilingService.GetWeekendPolicyById(id);

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<JobFiling>>> GetAll()
        {
            var jobFilingList = await jobFilingService.GetAllAsync();

            return Ok(jobFilingList);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(JobFiling jobFiling)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var jobFilings = await jobFilingService.InsertAsync(jobFiling);

            return CreatedAtAction(nameof(Insert), jobFilings);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(JobFiling jobFiling)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await jobFilingService.UpdateAsync(jobFiling);

            return Ok(result);
        }
    }
}