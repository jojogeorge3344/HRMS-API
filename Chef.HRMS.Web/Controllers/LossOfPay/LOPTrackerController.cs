using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers.LossOfPay
{
    [Route("api/LossOfPay/[controller]")]
    [ApiController]
    public class LOPTrackerController : ControllerBase
    {
        private readonly ILOPTrackerService lopTrackerServices;

        public LOPTrackerController(ILOPTrackerService lopTrackerServices)
        {
            this.lopTrackerServices = lopTrackerServices;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var lopTracker = await lopTrackerServices.GetAsync(id);

            if (lopTracker == null)
            {
                return NotFound();
            }

            var result = await lopTrackerServices.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<LOPTracker>> Get(int id)
        {
            var lopTracker = await lopTrackerServices.GetAsync(id);

            if (lopTracker == null)
            {
                return NotFound();
            }

            return Ok(lopTracker);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<LOPTracker>>> GetAll()
        {
            var lopTrackers = await lopTrackerServices.GetAllAsync();

            return Ok(lopTrackers);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Insert(LOPTracker lopTracker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            lopTracker = await lopTrackerServices.InsertAsync(lopTracker);

            return CreatedAtAction(nameof(Insert), lopTracker);
        }

        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(LOPTracker lopTracker)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            int result = await lopTrackerServices.UpdateAsync(lopTracker);

            return Ok(result);
        }

        [HttpGet("GetLossOfPayDeductionByEmployee/{employeeId}/{payrollProcessingMethodId}")]
        public async Task<ActionResult<IEnumerable<EmployeeLoanView>>> GetLossOfPayDeductionByEmployee(int employeeId, int payrollProcessingMethodId)
        {
            LossOfPayView lossOfPayDeduction = await lopTrackerServices.GetLossOfPayDeductionByEmployee(employeeId, payrollProcessingMethodId);

            return Ok(lossOfPayDeduction);
        }
    }
}