using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Chef.HRMS.Web.Controllers
{
    [ApiController]
    [Route("api/settings/attendance/[controller]")]
    public class WorkFromHomeSettingsController : ControllerBase
    {
        private readonly IWorkFromHomeSettingsService workFromHomeAdminSettingsService;

        public WorkFromHomeSettingsController(IWorkFromHomeSettingsService workFromHomeAdminSettingsService)
        {
            this.workFromHomeAdminSettingsService = workFromHomeAdminSettingsService;
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<WorkFromHomeSettings>> Get(int id)
        {
            var workFromHomeAdminSettings = await workFromHomeAdminSettingsService.GetAsync(id);

            if (workFromHomeAdminSettings == null)
            {
                return NotFound();
            }

            return Ok(workFromHomeAdminSettings);
        }
        [HttpGet("Get")]
        public async Task<ActionResult<WorkFromHomeSettings>> Get()
        {
            var workFromHomeAdminSettings = await workFromHomeAdminSettingsService.GetTopOneWorkFromHomeSettings();

            return Ok(workFromHomeAdminSettings);
        }
        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(WorkFromHomeSettings workFromHomeAdminSettings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            workFromHomeAdminSettings = await workFromHomeAdminSettingsService.InsertAsync(workFromHomeAdminSettings);

            return CreatedAtAction(nameof(Insert), workFromHomeAdminSettings);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(WorkFromHomeSettings workFromHomeAdminSettings)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await workFromHomeAdminSettingsService.UpdateAsync(workFromHomeAdminSettings);

            return Ok(result);
        }
    }
}