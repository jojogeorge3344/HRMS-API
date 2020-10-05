﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Chef.HRMS.Web.Controllers.Report
{
    [Route("api/Report/[controller]")]
    [ApiController]
    public class AttendanceReportController : ControllerBase
    {
        private readonly IAttendanceReportService attendanceReportService;

        public AttendanceReportController(IAttendanceReportService attendanceReportService)
        {
            this.attendanceReportService = attendanceReportService;
        }

        [HttpGet("GetAll/{startDate}/{endDate}")]
        public async Task<ActionResult<IEnumerable<AttendanceReportView>>> GetAttendanceLogReport(DateTime startDate, DateTime endDate)
        {
            var attendanceReportView = await attendanceReportService.GetAttendanceLogReport(startDate, endDate);

            return Ok(attendanceReportView);
        }
    }
}