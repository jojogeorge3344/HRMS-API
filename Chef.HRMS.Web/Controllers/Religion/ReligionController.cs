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
    public class ReligionController : ControllerBase
    {
        private readonly IReligionService religionService;

        public ReligionController(IReligionService religionService)
        {
            this.religionService = religionService;
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(Religion religion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var religionDetails = await religionService.InsertAsync(religion);

            return CreatedAtAction(nameof(Insert), religionDetails);
        }
        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(Religion religion)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await religionService.UpdateAsync(religion);

            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Religion>>> GetAll()
        {
            var religionList = await religionService.GetAllAsync();

            return Ok(religionList);
        }
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var religiondelete = await religionService.GetAsync(id);

            if (religiondelete == null)
            {
                return NotFound();
            }

            var result = await religionService.DeleteAsync(id);

            return Ok(result);
        }
        [HttpGet("IsReligionCodeExist/{code}")]
        public async Task<bool> IsReligionCodeExist(string code)
        {
            return await religionService.IsReligionCodeExist(code);
        }
    }
}
