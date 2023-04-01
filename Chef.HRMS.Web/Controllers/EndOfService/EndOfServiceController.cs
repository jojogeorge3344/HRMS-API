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
    public class EndOfServiceController : ControllerBase
    {
        private readonly IEndOfServiceService endOfServiceService;

        public EndOfServiceController(IEndOfServiceService endOfServiceService)
        {
            this.endOfServiceService = endOfServiceService;
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(EndOfService endOfService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var eos = await endOfServiceService.InsertAsync(endOfService);

            return CreatedAtAction(nameof(Insert), eos);
        }
        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(EndOfService endOfService)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await endOfServiceService.UpdateAsync(endOfService);

            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<EndOfService>>> GetAll()
        {
            var eosList = await endOfServiceService.GetAllAsync();

            return Ok(eosList);
        }
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var eos = await endOfServiceService.GetAsync(id);

            if (eos == null)
            {
                return NotFound();
            }

            var result = await endOfServiceService.DeleteAsync(id);

            return Ok(result);
        }
    }
}
