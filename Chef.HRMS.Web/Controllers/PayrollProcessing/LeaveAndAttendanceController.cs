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
    [Route("api/settings/payrollprocessing/[controller]")]
    [ApiController]
    public class LeaveAndAttendanceController : ControllerBase
    {
        private readonly ILeaveAndAttendanceService leaveAndAttendanceService;

        public LeaveAndAttendanceController(ILeaveAndAttendanceService leaveAndAttendanceService)
        {
            this.leaveAndAttendanceService = leaveAndAttendanceService;
        }

        [HttpGet("GetAllLeaveAndAttendanceByPaygroup/{paygroupId}/{fromDate}/{toDate}")]
        public async Task<ActionResult<IEnumerable<LeaveAndAttendanceViewModel>>> GetAllLeaveAndAttendanceByPaygroup(int paygroupId, DateTime fromDate, DateTime toDate, int payrollProcessId)
        {
            var leaveAndAttendanceList = await leaveAndAttendanceService.GetAllLeaveAndAttendanceByPaygroup(paygroupId, fromDate, toDate, payrollProcessId);

            return Ok(leaveAndAttendanceList);
        }

        [HttpGet("GetAllApprovedLeaveDetailsByEmployeeId/{employeeId}/{fromDate}/{toDate}")]
        public async Task<ActionResult<IEnumerable<LeaveDetailsViewModel>>> GetAllApprovedLeaveDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
            var leaveAndAttendanceList = await leaveAndAttendanceService.GetAllApprovedLeaveDetailsByEmployeeId(employeeId, fromDate, toDate);

            return Ok(leaveAndAttendanceList);
        }

        [HttpGet("GetAllUnapprovedLeaveDetailsByEmployeeId/{employeeId}/{fromDate}/{toDate}")]
        public async Task<ActionResult<IEnumerable<LeaveDetailsViewModel>>> GetAllUnapprovedLeaveDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
            var leaveAndAttendanceList = await leaveAndAttendanceService.GetAllUnapprovedLeaveDetailsByEmployeeId(employeeId, fromDate, toDate);

            return Ok(leaveAndAttendanceList);
        }

        [HttpGet("GetAllUnmarkedAttendanceDetailsByEmployeeId/{employeeId}/{fromDate}/{toDate}")]
        public async Task<ActionResult<IEnumerable<DateTime>>> GetAllUnmarkedAttendanceDetailsByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
            var leaveAndAttendanceList = await leaveAndAttendanceService.GetAllUnmarkedAttendanceDetailsByEmployeeId(employeeId, fromDate, toDate);

            return Ok(leaveAndAttendanceList);
        }

        [HttpGet("GetNumberOfEmployeesByPaygroup/{paygroupId}")]
        public async Task<ActionResult<int>> GetNumberOfEmployeesByPaygroup(int paygroupId)
        {
            var leaveAndAttendanceList = await leaveAndAttendanceService.GetNumberOfEmployeesByPaygroup(paygroupId);

            return Ok(leaveAndAttendanceList);
        }

        [HttpPost("InsertLeaveAndAttendanceDetails")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertLeaveAndAttendanceDetails([FromBody]IEnumerable<LeaveAndAttendance> leaveAndAttendances)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await leaveAndAttendanceService.InsertLeaveAndAttendanceDetailsAsync(leaveAndAttendances);

            return Ok(result);
        }

        [HttpGet("GetLeaveAndAttendanceByPayrollProcessingMethodId/{payrollProcessingMethodId}")]
        public async Task<ActionResult<IEnumerable<LeaveAndAttendance>>> GetLeaveAndAttendanceByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            var leaveAndAttendanceList = await leaveAndAttendanceService.GetLeaveAndAttendanceByPayrollProcessingMethodId(payrollProcessingMethodId);

            if (leaveAndAttendanceList == null)
            {
                return NotFound();
            }

            return Ok(leaveAndAttendanceList);
        }

        [HttpGet("GetLeaveAndAttendanceByEmployeeId/{employeeId}/{payrollProcessingMethodId}")]
        public async Task<ActionResult<LeaveAndAttendance>> GetLeaveAndAttendanceByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            var leaveAndAttendanceList = await leaveAndAttendanceService.GetLeaveAndAttendanceByEmployeeId(employeeId, payrollProcessingMethodId);

            if (leaveAndAttendanceList == null)
            {
                return NotFound();
            }

            return Ok(leaveAndAttendanceList);
        }

        [HttpGet("GetAllLeaveAndAttendanceByEmployeeId/{employeeId}/{fromDate}/{toDate}")]
        public async Task<ActionResult<IEnumerable<EmployeeAttendanceViewModel>>> GetAllLeaveAndAttendanceByEmployeeId(int employeeId, DateTime fromDate, DateTime toDate)
        {
            var leaveAndAttendanceList = await leaveAndAttendanceService.GetAllLeaveAndAttendanceByEmployeeId(employeeId, fromDate, toDate);

            if (leaveAndAttendanceList == null)
            {
                return NotFound();
            }

            return Ok(leaveAndAttendanceList);
        }

        [HttpGet("GetLOPCalculation/{fromDate}/{toDate}")]
        public async Task<ActionResult<IEnumerable<LOPCalculationView>>> GetLOPCalculation(DateTime fromDate, DateTime toDate)
        {
            var calculation = await leaveAndAttendanceService.GetLOPCalculation(fromDate, toDate);

            return Ok(calculation);
        }
    }
}