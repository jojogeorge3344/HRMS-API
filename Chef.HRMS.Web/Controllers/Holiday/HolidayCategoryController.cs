using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/[controller]")]
    [ApiController]
    public class HolidayCategoryController : ControllerBase
    {
        private readonly IHolidayCategoryService holidayCategoryService;

        public HolidayCategoryController(IHolidayCategoryService holidayCategoryService)
        {
            this.holidayCategoryService = holidayCategoryService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var holidayeCategory = await holidayCategoryService.GetAsync(id);

            if (holidayeCategory == null)
            {
                return NotFound();
            }

            var result = await holidayCategoryService.DeleteAsync(id);
            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<HolidayCategory>>> GetAll()
        {
            var holidayCategories = await holidayCategoryService.GetAllAsync();

            return Ok(holidayCategories);
        }
        [HttpPut("UpdateHolidayCategory/{id}/{isConfigured}")]
        public async Task<ActionResult<bool>> UpdateHolidayCategory(int id, bool isConfigured)
        {
            var holidayCategory = await holidayCategoryService.UpdateHolidayCategory(id, isConfigured);


            return Ok(holidayCategory);
        }

        [HttpGet("GetAllAssignedHolidayCategory")]
        public async Task<ActionResult<IEnumerable<int>>> GetAllAssignedHolidayCategory()
        {
            var holidayCategories = await holidayCategoryService.GetAllAssignedHolidayCategory();

            return Ok(holidayCategories);
        }


        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(HolidayCategory holidayCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await holidayCategoryService.InsertAsync(holidayCategory);

            return Ok(id);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(HolidayCategory holidayCategory)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await holidayCategoryService.UpdateAsync(holidayCategory);

            return Ok(result);
        }
    }
}