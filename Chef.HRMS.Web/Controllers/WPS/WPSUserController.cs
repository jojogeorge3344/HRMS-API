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
    public class WPSUserController : ControllerBase
    {
        private readonly IWPSUserService wpsUserService;

        public WPSUserController(IWPSUserService wpsUserService)
        {
            this.wpsUserService = wpsUserService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var wpsUser = await wpsUserService.GetAsync(id);

            if (wpsUser == null)
            {
                return NotFound();
            }

            var result = await wpsUserService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<WPSUser>> Get(int id)
        {
            var wpsUser = await wpsUserService.GetAsync(id);

            if (wpsUser == null)
            {
                return NotFound();
            }

            return Ok(wpsUser);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<WPSUser>>> GetAll()
        {
            var wpsUseres = await wpsUserService.GetAllAsync();

            return Ok(wpsUseres);
        }
        [HttpGet("GetAllByemployeeId/{employeeId}")]
        public async Task<ActionResult<IEnumerable<WPSUser>>> GetAllByemployeeId(int employeeId)
        {
            var wpsUseres = await wpsUserService.GetAllByemployeeId(employeeId);

            return Ok(wpsUseres);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(WPSUser wpsUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id  = await wpsUserService.InsertAsync(wpsUser);

            return Ok(id);
        }

        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(WPSUser wpsUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await wpsUserService.UpdateAsync(wpsUser);

            return Ok(result);
        }
        [HttpGet("GetBank")]
        public async Task<ActionResult<IEnumerable<HRMSBank>>> GetBank()
        {
            var bank = await wpsUserService.GetBank();

            return Ok(bank);
        }
    }
}