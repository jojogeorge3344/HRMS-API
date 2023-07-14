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
public class ExpenseDocumentController : ControllerBase
{
    private readonly IExpenseDocumentService expenseDocumentService;

    public ExpenseDocumentController(IExpenseDocumentService expenseDocumentService)
    {
        this.expenseDocumentService = expenseDocumentService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var expenseDocument = await expenseDocumentService.GetAsync(id);

        if (expenseDocument == null)
        {
            return NotFound();
        }

        var result = await expenseDocumentService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<ExpenseDocument>> Get(int id)
    {
        var expenseDocument = await expenseDocumentService.GetAsync(id);

        if (expenseDocument == null)
        {
            return NotFound();
        }

        return Ok(expenseDocument);
    }
    [HttpGet("GetDocumentById/{id}")]
    public async Task<ActionResult<ExpenseDocumentDetails>> GetDocumentById(int id)
    {
        var expenseDocument = await expenseDocumentService.GetDocumentById(id);

        if (expenseDocument == null)
        {
            return NotFound();
        }

        return Ok(expenseDocument);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<ExpenseDocument>>> GetAll()
    {
        var expenseDocumentes = await expenseDocumentService.GetAllAsync();

        return Ok(expenseDocumentes);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(ExpenseDocument expenseDocument)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await expenseDocumentService.InsertAsync(expenseDocument);

        return Ok(id);

    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(ExpenseDocument expenseDocument)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await expenseDocumentService.UpdateAsync(expenseDocument);

        return Ok(result);
    }
}