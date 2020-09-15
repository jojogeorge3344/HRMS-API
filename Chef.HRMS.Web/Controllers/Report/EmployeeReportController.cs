using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/Report/[controller]")]
    [ApiController]
    public class EmployeeReportController : ControllerBase
    {
        private readonly IEmployeeReportService employeeReportService;

        public EmployeeReportController(IEmployeeReportService employeeReportService)
        {
            this.employeeReportService = employeeReportService;
        }

        [HttpGet("GetAll/{offset}")]
        public async Task<ActionResult<IEnumerable<EmployeeDetailView>>> GetAllEmployeeDetailView(int offset)
        {
            var employeeDetailView = await employeeReportService.GetAllEmployeeDetailView(offset);

            return Ok(employeeDetailView);
        }
    }
}