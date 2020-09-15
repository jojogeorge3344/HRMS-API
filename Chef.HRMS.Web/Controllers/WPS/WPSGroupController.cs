using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/WPS/[controller]")]
    [ApiController]
    public class WPSGroupController : ControllerBase
    {
        private readonly IWPSGroupService wpsGroupService;

        public WPSGroupController(IWPSGroupService wpsGroupService)
        {
            this.wpsGroupService = wpsGroupService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var wpsGroup = await wpsGroupService.GetAsync(id);

            if (wpsGroup == null)
            {
                return NotFound();
            }

            var result = await wpsGroupService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<WPSGroup>> Get(int id)
        {
            var wpsGroup = await wpsGroupService.GetAsync(id);

            if (wpsGroup == null)
            {
                return NotFound();
            }

            return Ok(wpsGroup);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<WPSGroup>>> GetAll()
        {
            var wpsGroupes = await wpsGroupService.GetAllAsync();

            return Ok(wpsGroupes);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(WPSGroup wpsGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            wpsGroup = await wpsGroupService.InsertAsync(wpsGroup);

            return CreatedAtAction(nameof(Insert), wpsGroup);
        }

        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(WPSGroup wpsGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await wpsGroupService.UpdateAsync(wpsGroup);

            return Ok(result);
        }
    }
}
