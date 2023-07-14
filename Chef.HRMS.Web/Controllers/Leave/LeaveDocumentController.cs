using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LeaveDocumentController : ControllerBase
{
    private readonly ILeaveDocumentService leaveDocumentService;

    public LeaveDocumentController(ILeaveDocumentService leaveDocumentService)
    {
        this.leaveDocumentService = leaveDocumentService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var leaveDocument = await leaveDocumentService.GetAsync(id);

        if (leaveDocument == null)
        {
            return NotFound();
        }

        var result = await leaveDocumentService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<LeaveDocument>> Get(int id)
    {
        var leaveDocument = await leaveDocumentService.GetAsync(id);

        if (leaveDocument == null)
        {
            return NotFound();
        }

        return Ok(leaveDocument);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<LeaveDocument>>> GetAll()
    {
        var leaveDocuments = await leaveDocumentService.GetAllAsync();

        return Ok(leaveDocuments);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(LeaveDocument leaveDocument)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await leaveDocumentService.InsertAsync(leaveDocument);

        return Ok(id);

    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(LeaveDocument leaveDocument)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await leaveDocumentService.UpdateAsync(leaveDocument);

        return Ok(result);
    }
}