using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ExpenseController : ControllerBase
{
    private readonly IExpenseService expenseService;

    public ExpenseController(IExpenseService expenseService)
    {
        this.expenseService = expenseService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var expense = await expenseService.GetAsync(id);

        if (expense == null)
        {
            return NotFound();
        }

        var result = await expenseService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<Expense>> Get(int id)
    {
        var expense = await expenseService.GetAsync(id);

        if (expense == null)
        {
            return NotFound();
        }

        return Ok(expense);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<Expense>>> GetAll()
    {
        var expensees = await expenseService.GetAllAsync();

        return Ok(expensees);
    }

    [HttpGet("GetAllExpenseDetailsById/{id}")]
    public async Task<ActionResult<IEnumerable<Expense>>> GetAllExpenseDetailsById(int id)
    {
        var expense = await expenseService.GetAllExpenseDetailsById(id);

        return Ok(expense);
    }
    [HttpGet("GetAllUnApprovedExpenseById/{employeeId}")]
    public async Task<ActionResult<IEnumerable<Expense>>> GetAllUnApprovedExpenseById(int employeeId)
    {
        var expense = await expenseService.GetAllUnApprovedExpenseById(employeeId);

        return Ok(expense);
    }


    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(Expense expense)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await expenseService.InsertAsync(expense);

        return Ok(id);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(Expense expense)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await expenseService.UpdateAsync(expense);

        return Ok(result);
    }


    [HttpGet("GetMaximumExpenseAmountById/{employeeid}/{expenseconfigurationid}/{periodtype}/{currentDate}")]
    public async Task<ActionResult<ExpenseView>> GetMaximumExpenseAmountById(int employeeId, int expenseConfigurationId, int periodType, DateTime currentDate)
    {
        var result = await expenseService.GetMaximumExpenseAmountById(employeeId, expenseConfigurationId, periodType, currentDate);

        return Ok(result);
    }
    [HttpGet("GetMaximumInstancesById/{employeeid}/{expenseconfigurationid}/{periodtype}")]
    public async Task<ActionResult<ExpenseView>> GetMaximumInstancesById(int employeeId, int expenseConfigurationId, int periodType)
    {
        var result = await expenseService.GetMaximumInstancesById(employeeId, expenseConfigurationId, periodType);

        return Ok(result);
    }
}