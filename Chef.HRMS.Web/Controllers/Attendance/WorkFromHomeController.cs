using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[ApiController]
[Route("api/Attendance/[controller]")]
public class WorkFromHomeController : ControllerBase
{
    private readonly IWorkFromHomeService workFromHomeService;

    public WorkFromHomeController(IWorkFromHomeService workFromHomeService)
    {
        this.workFromHomeService = workFromHomeService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var workFromHome = await workFromHomeService.GetAsync(id);

        if (workFromHome == null)
        {
            return NotFound();
        }

        var result = await workFromHomeService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<WorkFromHome>> Get(int id)
    {
        var workFromHome = await workFromHomeService.GetAsync(id);

        if (workFromHome == null)
        {
            return NotFound();
        }

        return Ok(workFromHome);
    }
    [HttpGet("GetTotalRequestedDaysById/{id}")]
    public async Task<ActionResult<WorkFromHomeView>> GetTotalRequestedDaysById(int id)
    {
        var workFromHome = await workFromHomeService.GetTotalRequestedDaysById(id);

        if (workFromHome == null)
        {
            return NotFound();
        }

        return Ok(workFromHome);
    }

    [HttpGet("GetAllWorkFromHomeById/{id}")]
    public async Task<ActionResult<IEnumerable<WorkFromHome>>> GetAllWorkFromHomeById(int id)
    {
        var workFromHome = await workFromHomeService.GetAllWorkFromHomeById(id);

        return Ok(workFromHome);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<WorkFromHome>>> GetAll()
    {
        var workFromHomees = await workFromHomeService.GetAllAsync();

        return Ok(workFromHomees);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(WorkFromHome workFromHome)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await workFromHomeService.InsertAsync(workFromHome);

        return Ok(id);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(WorkFromHome workFromHome)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await workFromHomeService.UpdateAsync(workFromHome);

        return Ok(result);
    }
    [HttpPost("InsertNotifyPersonnel")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> InsertNotifyPersonnel(IEnumerable<WorkFromHomeNotifyPersonnel> workFromHomeNotifyPersonnel)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await workFromHomeService.InsertNotifyPersonnel(workFromHomeNotifyPersonnel);

        return Ok(result);
    }
}