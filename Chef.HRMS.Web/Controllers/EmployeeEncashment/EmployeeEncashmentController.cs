using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeEncashmentController : ControllerBase
{
    private readonly IEmployeeEncashmentService employeeEncashmentService;

    public EmployeeEncashmentController(IEmployeeEncashmentService employeeEncashmentService)
    {
        this.employeeEncashmentService = employeeEncashmentService;
    }

    [HttpPost("FinalSettlementInsert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> EmployeeEncashmentInsert(EmployeeEncashment employeeEncashment)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var encashment = await employeeEncashmentService.EmployeeEncashmentInsert(employeeEncashment);

        return Ok(encashment);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> EmployeeEncashmentUpdate(EmployeeEncashment employeeEncashment)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await employeeEncashmentService.EmployeeEncashmentUpdate(employeeEncashment);

        return Ok(result);
    }

    [HttpGet("GetFinalaSettlementList")]
    public async Task<ActionResult<IEnumerable<EmployeeEncashment>>> GetEmployeeEncashmentList()
    {
        var encashment = await employeeEncashmentService.GetEmployeeEncashmentList();

        return Ok(encashment);
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> EmployeeEncashmentDelete(int id)
    {
        int encashment = await employeeEncashmentService.EmployeeEncashmentDelete(id);

        return Ok(encashment);
    }

    [HttpGet("GetLeaveBalanceDetails/{fromDate}/{toDate}/{employeeId}")]
    public async Task<ActionResult<FianlSettlementLeaveBalanceView>> GetLeaveBalanceDetails(DateTime fromDate, DateTime toDate, int employeeId)
    {
        var balance = await employeeEncashmentService.GetLeaveBalanceDetails(fromDate, toDate, employeeId);

        return Ok(balance);
    }

    [HttpGet("GetEmployeeEncashmentComponents{employeeId}")]
    public async Task<ActionResult<EmployeeEncashmentComponentView>> GetEmployeeEncashmentComponents( int employeeId)
    {
        var components = await employeeEncashmentService.GetEmployeeEncashmentComponents( employeeId);

        return Ok(components);
    }

    [HttpGet("GetEmployeeEncashmentById/{id}")]
    public async Task<ActionResult<EmployeeEncashmentComponentView>> GetEmployeeEncashmentById(int id)
    {
        var components = await employeeEncashmentService.GetEmployeeEncashmentById(id);

        return Ok(components);
    }

    [HttpPost("EmployeeEncashmentProcess")]
    public async Task<IActionResult> EmployeeEncashmentProcess(EmployeeEncashment employeeEncashment)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var process = await employeeEncashmentService.EmployeeEncashmentProcess(employeeEncashment);

        return Ok(process);
    }
}