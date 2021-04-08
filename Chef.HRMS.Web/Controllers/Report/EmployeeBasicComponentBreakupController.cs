using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers.Report
{
    [Route("api/Report/[controller]")]
    [ApiController]
    public class EmployeeBasicComponentBreakupController : ControllerBase
    {
        private readonly IEmployeeBasicComponentBreakupService employeeBasicComponentBreakupService;

        public EmployeeBasicComponentBreakupController(IEmployeeBasicComponentBreakupService employeeBasicComponentBreakupService)
        {
            this.employeeBasicComponentBreakupService = employeeBasicComponentBreakupService;
        }

        [HttpGet("GetAll/{month}/{year}")]
        public async Task<ActionResult<IEnumerable<EmployeeBasicComponentBreakupView>>> GetAllEmployeeBasicComponentBreakupView(int month, int year)
        {
            var employeeBasicComponentBreakupView = await employeeBasicComponentBreakupService.GetAllEmployeeBasicComponentBreakupView(month, year);

            return Ok(employeeBasicComponentBreakupView);
        }
    }
}