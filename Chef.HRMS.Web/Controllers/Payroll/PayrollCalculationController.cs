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
public class PayrollCalculationController : ControllerBase
{
    private readonly IPayrollCalculationService payrollCalculationService;

    public PayrollCalculationController(IPayrollCalculationService payrollCalculationService)
    {
        this.payrollCalculationService = payrollCalculationService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var result = await payrollCalculationService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<PayrollCalculation>> Get(int id)
    {
        var payrollCalculationEngine = await payrollCalculationService.GetAsync(id);

        if (payrollCalculationEngine == null)
        {
            return NotFound();
        }

        return Ok(payrollCalculationEngine);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<PayrollCalculation>>> GetAll()
    {
        var payrollCalculations = await payrollCalculationService.GetAllAsync();

        return Ok(payrollCalculations);
    }

    [HttpGet("GetAllCalculationDetails")]
    public async Task<ActionResult<IEnumerable<PayrollCalculationViewModel>>> GetAllCalculationDetails()
    {
        var payrollCalculations = await payrollCalculationService.GetAllCalculationDetails();

        return Ok(payrollCalculations);
    }

    [HttpGet("GetPayrollComponentsByEmployeeId/{employeeId}")]
    public async Task<ActionResult<IEnumerable<PayrollCalculationViewModel>>> GetPayrollComponentsByEmployeeId(int employeeId)
    {
        var payrollCalculations = await payrollCalculationService.GetPayrollComponentsByEmployeeId(employeeId);

        if (payrollCalculations == null)
        {
            return NotFound();
        }

        return Ok(payrollCalculations);
    }

    [HttpGet("GetAllCalculationDetailsById/{id}")]
    public async Task<ActionResult<IEnumerable<PayrollCalculation>>> GetAllCalculationDetailsById(int id)
    {
        var payrollCalculations = await payrollCalculationService.GetAllCalculationDetailsById(id);

        return Ok(payrollCalculations);
    }

    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Insert(PayrollCalculation payrollCalculation)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await payrollCalculationService.InsertAsync(payrollCalculation);

        return CreatedAtAction(nameof(Insert), result);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Update(PayrollCalculation payrollCalculation)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await payrollCalculationService.UpdateAsync(payrollCalculation);

        return Ok(result);
    }

    [HttpGet("IsSystemVariableExist/{code}")]
    public async Task<bool> IsSystemVariableExist(string code)
    {
        return await payrollCalculationService.IsSystemVariableExist(code);
    }
}