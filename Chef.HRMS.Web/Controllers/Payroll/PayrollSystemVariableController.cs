using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/settings/payroll/[controller]")]
[ApiController]
public class PayrollSystemVariableController : ControllerBase
{
    private readonly IPayrollSystemVariableService payrollSystemVariableService;

    public PayrollSystemVariableController(IPayrollSystemVariableService payrollSystemVariableService)
    {
        this.payrollSystemVariableService = payrollSystemVariableService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var result = await payrollSystemVariableService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<PayrollSystemVariable>> Get(int id)
    {
        var payrollSystemVariable = await payrollSystemVariableService.GetAsync(id);

        if (payrollSystemVariable == null)
        {
            return NotFound();
        }

        return Ok(payrollSystemVariable);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<PayrollSystemVariable>>> GetAll()
    {
        var payrollSystemVariables = await payrollSystemVariableService.GetAllAsync();

        return Ok(payrollSystemVariables);
    }

    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Insert(PayrollSystemVariable payrollSystemVariable)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await payrollSystemVariableService.InsertAsync(payrollSystemVariable);

        return CreatedAtAction(nameof(Insert), result);
    }

    [HttpPut]
    [Route("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Update(PayrollSystemVariable payrollSystemVariable)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await payrollSystemVariableService.UpdateAsync(payrollSystemVariable);

        return Ok(result);
    }
}