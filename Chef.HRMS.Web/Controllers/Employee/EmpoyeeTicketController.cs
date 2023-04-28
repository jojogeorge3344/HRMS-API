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
    public class JobTitleController : ControllerBase
    {
        private readonly IJobTitleServices jobTitleServices;

        public JobTitleController(IJobTitleServices jobTitleServices)
        {
            this.jobTitleServices = jobTitleServices;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var JobTitle = await jobTitleServices.GetAsync(id);

            if (JobTitle == null)
            {
                return NotFound();
            }

            var result = await jobTitleServices.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<JobTitle>> Get(int id)
        {
            var JobTitle = await jobTitleServices.GetAsync(id);

            if (JobTitle == null)
            {
                return NotFound();
            }

            return Ok(JobTitle);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<JobTitle>>> GetAll()
        {
            var JobTitles = await jobTitleServices.GetAllAsync();

            return Ok(JobTitles);
        }

        [HttpGet("GetAllJobTitleList")]
        public async Task<ActionResult<IEnumerable<JobTitleView>>> GetAllJobTitleList()
        {
            var JobTitleList = await jobTitleServices.GetAllJobTitleList();

            return Ok(JobTitleList);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(JobTitle JobTitle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var jobTitle = await jobTitleServices.InsertAsync(JobTitle);
            return CreatedAtAction(nameof(Insert), jobTitle);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(JobTitle JobTitle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await jobTitleServices.UpdateAsync(JobTitle);

            return Ok(result);
        }
    }
}