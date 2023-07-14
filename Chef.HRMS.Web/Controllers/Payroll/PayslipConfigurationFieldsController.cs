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
public class PayslipConfigurationFieldsController : ControllerBase
{
    private readonly IPayslipConfigurationFieldsService payslipConfigurationFieldsService;

    public PayslipConfigurationFieldsController(IPayslipConfigurationFieldsService payslipConfigurationFieldsService)
    {
        this.payslipConfigurationFieldsService = payslipConfigurationFieldsService;
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<PayslipConfigurationFields>>> GetAll()
    {
        var payslipConfigurationFields = await payslipConfigurationFieldsService.GetAllAsync();

        return Ok(payslipConfigurationFields);
    }

    [HttpPost("UpdatePayslipConfigurationFieldsAsync")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> UpdatePayslipConfigurationFieldsAsync([FromBody]PayslipConfigurationFields[] payslipConfigurationFields)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await payslipConfigurationFieldsService.UpdatePayslipConfigurationFieldsAsync(payslipConfigurationFields);

        return Ok(result);
    }
}