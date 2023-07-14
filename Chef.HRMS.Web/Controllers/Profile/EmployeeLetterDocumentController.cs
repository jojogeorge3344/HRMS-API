using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[ApiController]
[Route("api/profile/[controller]")]
public class EmployeeLetterDocumentController : ControllerBase
{
    private readonly IEmployeeLetterDocumentService employeeLetterDocumentService;

    public EmployeeLetterDocumentController(IEmployeeLetterDocumentService employeeLetterDocumentService)
    {
        this.employeeLetterDocumentService = employeeLetterDocumentService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var employeeLetterDocument = await employeeLetterDocumentService.GetAsync(id);

        if (employeeLetterDocument == null)
        {
            return NotFound();
        }

        var result = await employeeLetterDocumentService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<EmployeeLetterDocument>> Get(int id)
    {
        var employeeLetterDocument = await employeeLetterDocumentService.GetAsync(id);

        if (employeeLetterDocument == null)
        {
            return NotFound();
        }

        return Ok(employeeLetterDocument);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<EmployeeLetterDocument>>> GetAll()
    {
        var employeeLetterDocuments = await employeeLetterDocumentService.GetAllAsync();

        return Ok(employeeLetterDocuments);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(EmployeeLetterDocument employeeLetterDocument)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await employeeLetterDocumentService.InsertAsync(employeeLetterDocument);

        return Ok(id);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(EmployeeLetterDocument employeeLetterDocument)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await employeeLetterDocumentService.UpdateAsync(employeeLetterDocument);

        return Ok(result);
    }
}