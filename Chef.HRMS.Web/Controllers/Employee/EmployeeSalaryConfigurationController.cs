using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/settings/[controller]")]
[ApiController]
public class EmployeeSalaryConfigurationController : ControllerBase
{
    private readonly IEmployeeSalaryConfigurationService employeeSalaryConfigurationService;

    public EmployeeSalaryConfigurationController(IEmployeeSalaryConfigurationService employeeSalaryConfigurationService)
    {
        this.employeeSalaryConfigurationService = employeeSalaryConfigurationService;
    }

    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Insert(EmployeeSalaryConfiguration employeeSalaryConfiguration)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await employeeSalaryConfigurationService.InsertAsync(employeeSalaryConfiguration);

        return CreatedAtAction(nameof(Insert), result);
    }

    [HttpPut]
    [Route("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Update(EmployeeSalaryConfiguration employeeSalaryConfiguration)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await employeeSalaryConfigurationService.UpdateAsync(employeeSalaryConfiguration);

        return Ok(result);
    }

    [HttpGet("GetSalaryConfigurationByEmployeeId/{employeeId}")]
    public async Task<ActionResult<IEnumerable<EmployeeSalaryConfigurationView>>> GetSalaryConfigurationByEmployeeId(int employeeId)
    {
        var employeeSalaryConfigurationList = await employeeSalaryConfigurationService.GetSalaryConfigurationByEmployeeId(employeeId);

        return Ok(employeeSalaryConfigurationList);
    }

    [HttpDelete("DeleteByEmployeeId/{employeeId}")]
    public async Task<ActionResult<int>> DeleteByEmployeeId(int employeeId)
    {
        var result = await employeeSalaryConfigurationService.DeleteByEmployeeId(employeeId);

        return Ok(result);
    }
}