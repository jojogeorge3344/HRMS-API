using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[ApiController]
[Route("api/settings/[controller]")]
public class EmployeeLetterController : ControllerBase
{
    private readonly IEmployeeLetterService employeeLetterService;

    public EmployeeLetterController(IEmployeeLetterService employeeLetterService)
    {
        this.employeeLetterService = employeeLetterService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var employeeLetter = await employeeLetterService.GetAsync(id);

        if (employeeLetter == null)
        {
            return NotFound();
        }

        var result = await employeeLetterService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<EmployeeLetter>> Get(int id)
    {
        var employeeLetter = await employeeLetterService.GetAsync(id);

        if (employeeLetter == null)
        {
            return NotFound();
        }

        return Ok(employeeLetter);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<EmployeeLetter>>> GetAll()
    {
        var companies = await employeeLetterService.GetAllAsync();

        return Ok(companies);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(EmployeeLetter employeeLetter)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id  = await employeeLetterService.InsertAsync(employeeLetter);

        return Ok(id);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(EmployeeLetter employeeLetter)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await employeeLetterService.UpdateAsync(employeeLetter);

        return Ok(result);
    }
}