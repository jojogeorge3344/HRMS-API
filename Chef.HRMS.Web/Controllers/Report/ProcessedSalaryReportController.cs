using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/Report/[controller]")]
    [ApiController]
    public class ProcessedSalaryReportController : ControllerBase
    {
        private readonly IProcessedSalaryReportService processedSalaryReportService;

        public ProcessedSalaryReportController(IProcessedSalaryReportService processedSalaryReportService)
        {
            this.processedSalaryReportService = processedSalaryReportService;
        }

        [HttpGet("GetProcessedSalaryDetails/{offset}")]
        public async Task<ActionResult<IEnumerable<ProcessedSalaryDetailsView>>> GetProcessedSalaryDetails(int offset)
        {
            var processedSalaryDetails = await processedSalaryReportService.GetProcessedSalaryDetails(offset);

            return Ok(processedSalaryDetails);
        }
    }
}