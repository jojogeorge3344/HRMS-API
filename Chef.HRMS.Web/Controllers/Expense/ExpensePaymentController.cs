using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/Expense/[controller]")]
[ApiController]
public class ExpensePaymentController : ControllerBase
{

    private readonly IExpensePaymentService expensePaymentService;

    public ExpensePaymentController(IExpensePaymentService expensePaymentService)
    {
        this.expensePaymentService = expensePaymentService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var expensePayment = await expensePaymentService.GetAsync(id);

        if (expensePayment == null)
        {
            return NotFound();
        }

        var result = await expensePaymentService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<ExpensePayment>> Get(int id)
    {
        var expensePayment = await expensePaymentService.GetAsync(id);

        if (expensePayment == null)
        {
            return NotFound();
        }

        return Ok(expensePayment);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<ExpensePayment>>> GetAll()
    {
        var expensePayment = await expensePaymentService.GetAllAsync();

        return Ok(expensePayment);
    }
    [HttpGet("GetAllPaidOutExpense")]
    public async Task<ActionResult<IEnumerable<ExpensePayment>>> GetAllPaidOutExpense()
    {
        var expensePayment = await expensePaymentService.GetAllPaidOutExpense();

        return Ok(expensePayment);
    }
    [HttpGet("GetAllApprovedExpense")]
    public async Task<ActionResult<IEnumerable<ExpensePayment>>> GetAllApprovedExpense()
    {
        var expensePayment = await expensePaymentService.GetAllApprovedExpense();

        return Ok(expensePayment);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(ExpensePayment expensePayment)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await expensePaymentService.InsertAsync(expensePayment);

        return Ok(id);
    }

    [HttpPut("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(ExpensePayment expensePayment)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await expensePaymentService.UpdateAsync(expensePayment);

        return Ok(result);
    }
    [HttpPut("UpdateExpenseStatus/{expenseRequestId}/{paymentMode}")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> UpdateExpenseStatus(int expenseRequestId, int paymentMode)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await expensePaymentService.UpdateExpenseStatus(expenseRequestId, paymentMode);

        return Ok(result);
    }

}