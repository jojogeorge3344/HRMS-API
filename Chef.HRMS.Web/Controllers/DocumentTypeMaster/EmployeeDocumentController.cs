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
public class EmployeeDocumentController : ControllerBase
{
    private readonly IEmployeeDocumentService employeeDocumentService;

    public EmployeeDocumentController(IEmployeeDocumentService employeeDocumentService)
    {
        this.employeeDocumentService = employeeDocumentService;
    }
    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Insert(EmployeeDocument employeeDocument)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var documentDetails = await employeeDocumentService.InsertAsync(employeeDocument);

        return CreatedAtAction(nameof(Insert), documentDetails);
    }
    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(EmployeeDocument employeeDocument)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await employeeDocumentService.UpdateAsync(employeeDocument);

        return Ok(result);
    }
    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<EmployeeDocument>>> GetAll()
    {
        var documentList = await employeeDocumentService.GetAllAsync();

        return Ok(documentList);
    }
    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var documentdelete = await employeeDocumentService.GetAsync(id);

        if (documentdelete == null)
        {
            return NotFound();
        }

        var result = await employeeDocumentService.DeleteAsync(id);

        return Ok(result);
    }
    [HttpGet("GetEmployeeId/{id}")]
    public async Task<ActionResult<IEnumerable<EmployeeDocument>>> GetEmployeeId(int id)
    {
        var employee = await employeeDocumentService.GetEmployeeId(id);

        if (employee == null)
        {
            return NotFound();
        }

        return Ok(employee);
    }
    [HttpGet("GetAllByEmployeeId/{id}/{documentid}")]
    public async Task<ActionResult<EmployeeDocumentAttachment>> GetAllByEmployeeId(int id, int documentid)
    {
        var employeeDetails = await employeeDocumentService.GetAllByEmployeeId(id, documentid);

        if (employeeDetails == null)
        {
            return NotFound();
        }

        return Ok(employeeDetails);
    }

    [HttpGet("IsDocumentCodeExist/{documentnumber}")]
    public async Task<bool> IsDocumentCodeExist(string documentnumber)
    {
        return await employeeDocumentService.IsDocumentCodeExist(documentnumber);
    }

    [HttpGet("GetPDFViewer/{filePath}")]
    public async Task<ActionResult<byte[]>> GetPDFViewer(string filePath)
    {
        return await employeeDocumentService.GetPDFViewer(filePath);

    }
    [HttpGet("GetAllActiveDocumentsTypes")]
    public async Task<ActionResult<IEnumerable<HRMS.Models.DocumentDetail>>> GetAllActiveDocumentsTypes()
    {
        var documentList = await employeeDocumentService.GetAllActiveDocumentsTypes();

        return Ok(documentList);
    }
}
