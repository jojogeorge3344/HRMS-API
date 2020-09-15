using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/payroll/[controller]")]
    [ApiController]
    public class BonusTypeController : ControllerBase
    {
        private readonly IBonusTypeService bonusTypeService;

        public BonusTypeController(IBonusTypeService bonusTypeService)
        {
            this.bonusTypeService = bonusTypeService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var result = await bonusTypeService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<BonusType>> Get(int id)
        {
            var bonusType = await bonusTypeService.GetAsync(id);

            if (bonusType == null)
            {
                return NotFound();
            }

            return Ok(bonusType);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<BonusType>>> GetAll()
        {
            var bonusTypes = await bonusTypeService.GetAllAsync();

            return Ok(bonusTypes);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(BonusType bonusType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await bonusTypeService.InsertAsync(bonusType);

            return CreatedAtAction(nameof(Insert), result);
        }

        [HttpPut]
        [Route("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(BonusType bonusType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await bonusTypeService.UpdateAsync(bonusType);

            return Ok(result);
        }
    }
}