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
    [Route("api/settings/branch/signatory")]
    public class BranchSignatoryController : ControllerBase
    {
        private readonly IBranchSignatoryService branchSignatoryService;

        public BranchSignatoryController(IBranchSignatoryService branchSignatoryService)
        {
            this.branchSignatoryService = branchSignatoryService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var branchSignatory = await branchSignatoryService.GetAsync(id);

            if (branchSignatory == null)
            {
                return NotFound();
            }

            var result = await branchSignatoryService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<HRMSBranchSignatory>> Get(int id)
        {
            var branchSignatory = await branchSignatoryService.GetAsync(id);

            if (branchSignatory == null)
            {
                return NotFound();
            }

            return Ok(branchSignatory);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<HRMSBranchSignatory>>> GetAll()
        {
            var branchSignatories = await branchSignatoryService.GetAllAsync();

            if (branchSignatories == null)
            {
                return NotFound();
            }

            return Ok(branchSignatories);
        }

        [HttpGet("GetAllByBranch/{branchid}")]
        public async Task<ActionResult<IEnumerable<HRMSBranchSignatory>>> GetAllByBranch(int branchId)
        {
            var branchSignatory = await branchSignatoryService.GetAllByBranch(branchId);

            if (branchSignatory == null)
            {
                return NotFound();
            }

            return Ok(branchSignatory);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(HRMSBranchSignatory branchSignatory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            branchSignatory = await branchSignatoryService.InsertAsync(branchSignatory);

            return CreatedAtAction(nameof(Insert), branchSignatory);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(HRMSBranchSignatory branchSignatory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await branchSignatoryService.UpdateAsync(branchSignatory);

            return Ok(result);
        }
    }
}