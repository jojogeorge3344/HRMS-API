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
    [Route("api/settings/[controller]")]
    public class BranchController : ControllerBase
    {
        private readonly IBranchService branchService;

        public BranchController(IBranchService branchService)
        {
            this.branchService = branchService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var branch = await branchService.GetAsync(id);

            if (branch == null)
            {
                return NotFound();
            }

            var result = await branchService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<HRMSBranch>> Get(int id)
        {
            var branch = await branchService.GetAsync(id);

            if (branch == null)
            {
                return NotFound();
            }

            return Ok(branch);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<HRMSBranch>>> GetAll()
        {
            var branches = await branchService.GetAllAsync();

            return Ok(branches);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(HRMSBranch branch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            branch = await branchService.InsertAsync(branch);

            return CreatedAtAction(nameof(Insert), branch);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(HRMSBranch Branch)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await branchService.UpdateAsync(Branch);

            return Ok(result);
        }
    }
}