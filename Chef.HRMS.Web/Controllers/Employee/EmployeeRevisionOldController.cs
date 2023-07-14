using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Chef.HRMS.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeRevisionOldController : ControllerBase
{
    private readonly IEmployeeRevisionOldService employeeRevisionOldService;

    public EmployeeRevisionOldController(IEmployeeRevisionOldService employeeRevisionOldService)
    {
        this.employeeRevisionOldService = employeeRevisionOldService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var EmployeeRevisionOld = await employeeRevisionOldService.GetAsync(id);

        if (EmployeeRevisionOld == null)
        {
            return NotFound();
        }

        var result = await employeeRevisionOldService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<EmployeeRevisionOld>> Get(int id)
    {
        var EmployeeRevisionOld = await employeeRevisionOldService.GetAsync(id);

        if (EmployeeRevisionOld == null)
        {
            return NotFound();
        }

        return Ok(EmployeeRevisionOld);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<EmployeeRevisionOld>>> GetAll()
    {
        var EmployeeRevisionOlds = await employeeRevisionOldService.GetAllAsync();

        return Ok(EmployeeRevisionOlds);
    }



    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Insert(EmployeeRevisionOld employeeRevisionOld)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await employeeRevisionOldService.InsertAsync(employeeRevisionOld);
        return CreatedAtAction(nameof(Insert), result);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Update(EmployeeRevisionOld employeeRevisionOld)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await employeeRevisionOldService.UpdateAsync(employeeRevisionOld);

        return Ok(result);
    }
    [HttpGet("GetEmployeeRevisionOld/{employeeRevisionId}")]
    public async Task<ActionResult<EmployeeRevisionOld>> GetEmployeeRevisionOld(int employeeRevisionId)
    {
        var EmployeeRevisionOld = await employeeRevisionOldService.GetEmployeeRevisionOld(employeeRevisionId);

        if (EmployeeRevisionOld == null)
        {
            return NotFound();
        }

        return Ok(EmployeeRevisionOld);
    }
}