using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/[controller]")]
    [ApiController]
    public class HolidayController : ControllerBase
    {
        private readonly IHolidayService holidayService;

        public HolidayController(IHolidayService holidayService)
        {
            this.holidayService = holidayService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var holidaye = await holidayService.GetAsync(id);

            if (holidaye == null)
            {
                return NotFound();
            }

            var result = await holidayService.DeleteAsync(id);
            return Ok(result);
        }

        [HttpGet("GetAllByCategory/{categoryId}")]
        public async Task<ActionResult<IEnumerable<HolidayCategory>>> GetAllByCategory(int categoryId)
        {
            var holidays = await holidayService.GetAllByCategory(categoryId);

            if (holidays == null)
            {
                return NotFound();
            }

            return Ok(holidays);
        }

        [HttpGet("GetAllHolidaysByEmployee/{id}")]
        public async Task<ActionResult<IEnumerable<DateTime>>> GetAllHolidaysByEmployee(int id)
        {
            var holidays = await holidayService.GetAllHolidaysByEmployee(id);

            if (holidays == null)
            {
                return NotFound();
            }

            return Ok(holidays);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Holiday>>> GetAll()
        {
            var holidays = await holidayService.GetAllAsync();

            return Ok(holidays);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(Holiday holiday)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            holiday = await holidayService.InsertAsync(holiday);

            return CreatedAtAction(nameof(Insert), holiday);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(Holiday holiday)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await holidayService.UpdateAsync(holiday);

            return Ok(result);
        }
    }
}