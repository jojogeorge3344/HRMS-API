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
    public class PANController : ControllerBase
    {
        private readonly IPANService panService;

        public PANController(IPANService panService)
        {
            this.panService = panService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var pan = await panService.GetAsync(id);

            if (pan == null)
            {
                return NotFound();
            }

            var result = await panService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PAN>> Get(int id)
        {
            var pan = await panService.GetAsync(id);

            if (pan == null)
            {
                return NotFound();
            }

            return Ok(pan);
        }

        [HttpGet("GetByEmployeeId/{id}")]
        public async Task<ActionResult<IEnumerable<PANView>>> GetByEmployeeId(int id)
        {
            var pan = await panService.GetByEmployeeId(id);

            if (pan == null)
            {
                return NotFound();
            }

            return Ok(pan);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PAN>>> GetAll()
        {
            var pans = await panService.GetAllAsync();

            return Ok(pans);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(PAN pan)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            pan = await panService.InsertAsync(pan);

            return CreatedAtAction(nameof(Insert), pan);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(PAN pan)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await panService.UpdateAsync(pan);

            return Ok(result);
        }
    }
}