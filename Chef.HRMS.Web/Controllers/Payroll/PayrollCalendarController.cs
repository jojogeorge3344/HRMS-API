using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/payroll/[controller]")]
    [ApiController]
    public class PayrollCalendarController : ControllerBase
    {
        private readonly IPayrollCalendarService payrollCalendarService;

        public PayrollCalendarController(IPayrollCalendarService payrollCalendarService)
        {
            this.payrollCalendarService = payrollCalendarService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var result = await payrollCalendarService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PayrollCalendar>> Get(int id)
        {
            var payrollCalendar = await payrollCalendarService.GetAsync(id);

            if (payrollCalendar == null)
            {
                return NotFound();
            }

            return Ok(payrollCalendar);
        }
        [HttpGet("GetDuplicateValue/{name}")]
        public async Task<ActionResult<bool>> GetDuplicateValue(string name)
        {
            var payrollCalendar = await payrollCalendarService.IsDuplicateValueExists(name);
            return Ok(payrollCalendar);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PayrollCalendar>>> GetAll()
        {
            var payrollCalendar = await payrollCalendarService.GetAllAsync();

            return Ok(payrollCalendar);
        }
        [HttpGet("GetAllAssignedPayCalendar")]
        public async Task<ActionResult<IEnumerable<int>>> GetAllAssignedPayCalendar()
        {
            var payrollCalendarIds = await payrollCalendarService.GetAllAssignedPayCalendar();

            return Ok(payrollCalendarIds);
        }


        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(PayrollCalendar payrollCalendar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollCalendarService.InsertAsync(payrollCalendar);

            return CreatedAtAction(nameof(Insert), result);
        }

        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(PayrollCalendar payrollCalendar)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollCalendarService.UpdateAsync(payrollCalendar);

            return Ok(result);
        }
        [HttpGet("GetStartDateAndEndDate")]
        public async Task<ActionResult<IEnumerable<WeekofDateList>>> GetStartDateAndEndDate(string weekstart, string weekend)
        {
            var startAndEndDate = await payrollCalendarService.GetStartDateAndEndDate(weekstart,weekend);

            return Ok(startAndEndDate);
        }
        [HttpGet("GetWeekOff")]
        public async Task<ActionResult<IEnumerable<WeekOff>>> GetWeekOff()
        {
            var Weekoff = await payrollCalendarService.GetWeekOff();

            return Ok(Weekoff);
        }
    }
}