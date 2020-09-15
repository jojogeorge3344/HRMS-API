using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/Report/[controller]")]
    [ApiController]
    public class LeaveReportController : ControllerBase
    {
        private readonly ILeaveReportService leaveReportService;

        public LeaveReportController(ILeaveReportService leaveReportService)
        {
            this.leaveReportService = leaveReportService;
        }

        [HttpGet("GetLeaveReportDetails/{offset}")]
        public async Task<ActionResult<IEnumerable<LeaveReportView>>> GetLeaveReportDetails(int offset)
        {
            var leaveReports = await leaveReportService.GetLeaveReportDetails(offset);

            return Ok(leaveReports);
        }
    }
}