using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [ApiController]
    [Route("api/Attendance/[controller]")]
    public class AttendanceAdminController : ControllerBase
    {
        private readonly IAttendanceAdminService attendanceAdminService;

        public AttendanceAdminController(IAttendanceAdminService attendanceAdminService)
        {
            this.attendanceAdminService = attendanceAdminService;
        }

        [HttpGet("GetTodaysAttendanceStats")]
        public async Task<ActionResult<IEnumerable<AttendanceAdminStatsView>>> GetTodaysAttendanceStats()
        {
            var todaysAttendanceStats = await attendanceAdminService.GetTodaysAttendanceStats();

            return Ok(todaysAttendanceStats);
        }

        [HttpGet("GetAttendanceLogs/{fromDate}/{toDate}")]
        public async Task<ActionResult<IEnumerable<AttendanceAdminLogsView>>> GetAttendanceLogs(DateTime fromDate, DateTime toDate)
        {
            var attendanceLogs = await attendanceAdminService.GetAttendanceLogs(fromDate, toDate);

            return Ok(attendanceLogs);
        }

        [HttpGet("GetLeaveLogs/{fromDate}/{toDate}")]
        public async Task<ActionResult<IEnumerable<AttendanceAdminLeaveLogsView>>> GetLeaveLogs(DateTime fromDate, DateTime toDate)
        {
            var leaveLogs = await attendanceAdminService.GetLeaveLogs(fromDate, toDate);

            return Ok(leaveLogs);
        }

        [HttpGet("MarkedDates/{tablename}/{employeeId}")]
        public async Task<ActionResult<IEnumerable<DateTime>>> MarkedDates(string tablename, int employeeId)
        {
            var leaveLogs = await attendanceAdminService.MarkedDates(tablename, employeeId);

            return Ok(leaveLogs);
        }


        [HttpGet("AlreadyExistOrNot/{fromDate}/{toDate}/{employeeId}")]
        public async Task<ActionResult<int>> AlreadyExistOrNot(DateTime fromDate, DateTime toDate, int employeeId)
        {
            var result = await attendanceAdminService.AlreadyExistOrNot(fromDate, toDate, employeeId);
            return Ok(result);
        }
    }
}