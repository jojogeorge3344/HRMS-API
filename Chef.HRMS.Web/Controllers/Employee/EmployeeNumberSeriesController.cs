using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class EmployeeNumberSeriesController : ControllerBase
{
    private readonly IEmployeeNumberSeriesServices employeeNumberSeriesServices;

    public EmployeeNumberSeriesController(IEmployeeNumberSeriesServices employeeNumberSeriesServices)
    {
        this.employeeNumberSeriesServices = employeeNumberSeriesServices;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var JobTitle = await employeeNumberSeriesServices.GetAsync(id);

        if (JobTitle == null)
        {
            return NotFound();
        }

        var result = await employeeNumberSeriesServices.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<EmployeeNumberSeries>> Get(int id)
    {
        var JobTitle = await employeeNumberSeriesServices.GetAsync(id);

        if (JobTitle == null)
        {
            return NotFound();
        }

        return Ok(JobTitle);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<EmployeeNumberSeries>>> GetAll()
    {
        var EmployeeNumberSeries = await employeeNumberSeriesServices.GetAllAsync();

        return Ok(EmployeeNumberSeries);
    }
    [HttpGet("GetAllActiveNumberSeries")]
    public async Task<ActionResult<IEnumerable<EmployeeNumberSeries>>> GetAllActiveNumberSeries()
    {
        var EmployeeNumberSeries = await employeeNumberSeriesServices.GetAllActiveNumberSeries();

        return Ok(EmployeeNumberSeries);
    }


    [HttpGet("GetAllAssignedNumberSeries")]
    public async Task<ActionResult<IEnumerable<int>>> GetAllAssignedNumberSeries()
    {
        var employeeNumberSeries = await employeeNumberSeriesServices.GetAllAssignedNumberSeries();

        return Ok(employeeNumberSeries);
    }


    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Insert(EmployeeNumberSeries employeeNumberSeries)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await employeeNumberSeriesServices.InsertAsync(employeeNumberSeries);
        return Ok(id);

    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Update(EmployeeNumberSeries employeeNumberSeries)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await employeeNumberSeriesServices.UpdateAsync(employeeNumberSeries);

        return Ok(result);
    }
}