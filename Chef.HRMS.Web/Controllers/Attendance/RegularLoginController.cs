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
    [ApiController]
    [Route("api/Attendance/[controller]")]
    public class RegularLoginController : ControllerBase
    {
        private readonly IRegularLoginService regularLoginService;

        public RegularLoginController(IRegularLoginService regularLoginService)
        {
            this.regularLoginService = regularLoginService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var regularLogin = await regularLoginService.GetAsync(id);

            if (regularLogin == null)
            {
                return NotFound();
            }

            var result = await regularLoginService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<RegularLogin>> Get(int id)
        {
            var regularLogin = await regularLoginService.GetAsync(id);

            if (regularLogin == null)
            {
                return NotFound();
            }

            return Ok(regularLogin);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<RegularLogin>>> GetAll()
        {
            var checkInCheckOuts = await regularLoginService.GetAllAsync();

            return Ok(checkInCheckOuts);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(RegularLogin regularLogin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //var id = await regularLoginService.InsertAsync(regularLogin);
            var result = await regularLoginService.InsertAsync(regularLogin);

            return Ok(result);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(RegularLogin regularLogin)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await regularLoginService.UpdateAsync(regularLogin);

            return Ok(result);
        }

        [HttpGet("GetAllAttendanceById/{id}")]
        public async Task<ActionResult<IEnumerable<RegularLogin>>> GetAllAttendanceById(int id)
        {
            var attendance = await regularLoginService.GetAllAttendanceById(id);

            return Ok(attendance);
        }

        [HttpGet("GetAverageAttendanceById/{id}/{type}")]
        public async Task<ActionResult<decimal>> GetAverageAttendanceById(int id, int type)
        {
            var attendance = await regularLoginService.GetAverageAttendanceById(id, type);

            return Ok(attendance);
        }

        [HttpGet("GetAverageOnTimeDetails/{id}/{type}")]
        public async Task<ActionResult<decimal>> GetAverageOnTimeDetails(int id, int type)
        {
            var attendance = await regularLoginService.GetAverageOnTimeDetails(id, type);

            return Ok(attendance);
        }

        [HttpGet("GetAttendanceLog/{id}/{startDate}/{endDate}")]
        public async Task<ActionResult<UserAttendanceViewModel>> GetAttendanceLog(int id, DateTime startDate, DateTime endDate)
        {
            var attendance = await regularLoginService.GetAttendanceLog(id, startDate, endDate);

            return Ok(attendance);
        }
    }
}