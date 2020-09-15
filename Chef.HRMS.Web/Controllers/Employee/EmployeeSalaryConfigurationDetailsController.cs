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
    public class EmployeeSalaryConfigurationDetailsController : ControllerBase
    {
        private readonly IEmployeeSalaryConfigurationDetailsService employeeSalaryConfigurationDetailsService;

        public EmployeeSalaryConfigurationDetailsController(IEmployeeSalaryConfigurationDetailsService employeeSalaryConfigurationDetailsService)
        {
            this.employeeSalaryConfigurationDetailsService = employeeSalaryConfigurationDetailsService;
        }

        [HttpPost("InsertEmployeeSalaryConfigDetails")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await employeeSalaryConfigurationDetailsService.InsertEmployeeSalaryConfigDetails(employeeSalaryConfigurationDetails);

            return Ok(result);
        }

        [HttpPut]
        [Route("UpdateEmployeeSalaryConfigDetails")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateEmployeeSalaryConfigDetails(IEnumerable<EmployeeSalaryConfigurationDetails> employeeSalaryConfigurationDetails)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await employeeSalaryConfigurationDetailsService.UpdateEmployeeSalaryConfigDetails(employeeSalaryConfigurationDetails);

            return Ok(result);
        }

        [HttpDelete("DeleteByEmployeeId/{employeeId}")]
        public async Task<ActionResult<int>> DeleteByEmployeeId(int employeeId)
        {
            var result = await employeeSalaryConfigurationDetailsService.DeleteByEmployeeId(employeeId);

            return Ok(result);
        }
    }
}