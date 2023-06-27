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
    public class FinalSettlementController : ControllerBase
    {
        private readonly IFinalSettlemetService finalSettlemetService;

        public FinalSettlementController(IFinalSettlemetService finalSettlemetService)
        {
            this.finalSettlemetService = finalSettlemetService;
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(FinalSettlement finalSettlement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var settlement = await finalSettlemetService.InsertAsync(finalSettlement);

            return Ok(settlement);
        }
        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(FinalSettlement finalSettlement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await finalSettlemetService.UpdateAsync(finalSettlement);

            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<FinalSettlement>>> GetAll()
        {
            var settlementList = await finalSettlemetService.GetAllAsync();

            return Ok(settlementList);
        }
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var finalSettlement = await finalSettlemetService.GetAsync(id);

            if (finalSettlement == null)
            {
                return NotFound();
            }

            var result = await finalSettlemetService.DeleteAsync(id);

            return Ok(result);
        }
    }
}
