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
    public class PayrollComponentConfigurationController : ControllerBase
    {
        private readonly IPayrollComponentConfigurationService payrollComponentConfigurationService;

        public PayrollComponentConfigurationController(IPayrollComponentConfigurationService payrollComponentConfigurationService)
        {
            this.payrollComponentConfigurationService = payrollComponentConfigurationService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var result = await payrollComponentConfigurationService.DeletePayrollComponent(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PayrollComponentConfiguration>> Get(int id)
        {
            var payrollComponentConfiguration = await payrollComponentConfigurationService.GetAsync(id);

            if (payrollComponentConfiguration == null)
            {
                return NotFound();
            }

            return Ok(payrollComponentConfiguration);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PayrollComponentConfiguration>>> GetAll()
        {
            var payrollComponentConfigurations = await payrollComponentConfigurationService.GetAllAsync();

            return Ok(payrollComponentConfigurations);
        }

        [HttpGet("GetAll/{id}")]
        public async Task<ActionResult<IEnumerable<PayrollComponentConfiguration>>> GetAllByPayrollStuctureId(int id)
        {
            var payrollComponentConfigurations = await payrollComponentConfigurationService.GetAllByPayrollStuctureId(id);

            return Ok(payrollComponentConfigurations);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Insert(PayrollComponentConfigurationInsert payrollComponentConfigurationInsert)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollComponentConfigurationService.InsertAsync(payrollComponentConfigurationInsert.PayrollComponentConfiguration, payrollComponentConfigurationInsert.PayrollComponentConfigurationIds);

            return Ok(result);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(PayrollComponentConfiguration payrollComponentConfiguration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollComponentConfigurationService.UpdateAsync(payrollComponentConfiguration);

            return Ok(result);
        }
        [HttpGet("GetAllByPayrollComponentId/{payrollComponentId}")]
        public async Task<ActionResult<PayrollComponentConfiguration>> GetAllByPayrollComponentId(int payrollComponentId)
        {
            var payrollComponentConfiguration = await payrollComponentConfigurationService.GetAllByPayrollComponentId(payrollComponentId);

            if (payrollComponentConfiguration == null)
            {
                return NotFound();
            }

            return Ok(payrollComponentConfiguration);
        }
    }
}