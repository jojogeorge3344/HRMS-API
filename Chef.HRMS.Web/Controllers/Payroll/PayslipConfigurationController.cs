using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/payroll/[controller]")]
    [ApiController]
    public class PayslipConfigurationController : ControllerBase
    {
        private readonly IPayslipConfigurationService payslipConfigurationService;

        public PayslipConfigurationController(IPayslipConfigurationService payslipConfigurationService)
        {
            this.payslipConfigurationService = payslipConfigurationService;
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PayslipConfiguration>> Get(int id)
        {
            var payslipConfiguration = await payslipConfigurationService.GetAsync(id);

            if (payslipConfiguration == null)
            {
                return NotFound();
            }

            return Ok(payslipConfiguration);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(PayslipConfiguration payslipConfiguration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payslipConfigurationService.InsertAsync(payslipConfiguration);

            return CreatedAtAction(nameof(Insert), result);
        }

        [HttpPut]
        [Route("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(PayslipConfiguration payslipConfiguration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payslipConfigurationService.UpdateAsync(payslipConfiguration);

            return Ok(result);
        }
    }
}