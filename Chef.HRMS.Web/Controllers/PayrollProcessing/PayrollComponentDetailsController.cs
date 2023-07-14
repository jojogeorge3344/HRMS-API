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
public class PayrollComponentDetailsController : ControllerBase
{
    private readonly IPayrollComponentDetailsService payrollComponentDetailsService;

    public PayrollComponentDetailsController(IPayrollComponentDetailsService payrollComponentDetailsService)
    {
        this.payrollComponentDetailsService = payrollComponentDetailsService;
    }
    [HttpGet("GetPayslipYears")]
    public async Task<ActionResult<IEnumerable<PayrollComponentDetails>>> GetPayslipYears()
    {
        var year = await payrollComponentDetailsService.GetPayslipYears();

        return Ok(year);
    }
}
