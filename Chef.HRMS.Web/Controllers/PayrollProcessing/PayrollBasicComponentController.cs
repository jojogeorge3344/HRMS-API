using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/payrollprocessing/[controller]")]
    [ApiController]
    public class PayrollBasicComponentController : ControllerBase
    {
        private readonly IPayrollBasicComponentService payrollBasicComponentService;

        public PayrollBasicComponentController(IPayrollBasicComponentService payrollBasicComponentService)
        {
            this.payrollBasicComponentService = payrollBasicComponentService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var result = await payrollBasicComponentService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PayrollBasicComponent>> Get(int id)
        {
            var payrollProcessingMethod = await payrollBasicComponentService.GetAsync(id);

            if (payrollProcessingMethod == null)
            {
                return NotFound();
            }

            return Ok(payrollProcessingMethod);
        }

        [HttpGet("GetPayrollBreakUpByEmployeeId/{id}/{payrollProcessingMethodId}")]
        public async Task<ActionResult<PayrollBasicComponent>> GetPayrollBreakUpByEmployeeId(int id, int payrollProcessingMethodId)
        {
            var payrollProcessingMethod = await payrollBasicComponentService.GetPayrollBreakUpByEmployeeId(id, payrollProcessingMethodId);

            if (payrollProcessingMethod == null)
            {
                return NotFound();
            }

            return Ok(payrollProcessingMethod);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PayrollBasicComponent>>> GetAll()
        {
            var payrollProcessingMethodList = await payrollBasicComponentService.GetAllAsync();

            return Ok(payrollProcessingMethodList);
        }

        [HttpGet("GetBasicComponentsByPaygroup/{paygroupId}/{year}/{month}")]
        public async Task<ActionResult<IEnumerable<EmployeeSalaryConfigurationView>>> GetBasicComponentsByPaygroup(int paygroupId, int year, int month)
        {
            var basicComponentsList = await payrollBasicComponentService.GetBasicComponentsByPaygroup(paygroupId, year, month);

            return Ok(basicComponentsList);
        }

        [HttpGet("GetPayrollBasicComponentByEmployeeId/{id}")]
        public async Task<ActionResult<IEnumerable<EmployeeSalaryConfigurationView>>> GetPayrollBasicComponentByEmployeeId(int id)
        {
            var basicComponentsList = await payrollBasicComponentService.GetPayrollBasicComponentByEmployeeId(id);

            return Ok(basicComponentsList);
        }

        [HttpPost("InsertPayrollBasicComponentsOld")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertPayrollBasicComponents(IEnumerable<PayrollBasicComponent> payrollBasicComponents)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollBasicComponentService.InsertPayrollBasicComponents(payrollBasicComponents);

            return Ok(result);
        }

        [HttpPost("InsertPayrollBasicComponents")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertOrUpdateAsync(IEnumerable<PayrollBasicComponent> payrollBasicComponents)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollBasicComponentService.InsertOrUpdateAsync(payrollBasicComponents);

            return Ok(result);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(PayrollBasicComponent payrollBasicComponent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollBasicComponentService.InsertAsync(payrollBasicComponent);

            return CreatedAtAction(nameof(Insert), result);
        }

        [HttpPut]
        [Route("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(PayrollBasicComponent payrollBasicComponent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollBasicComponentService.UpdateAsync(payrollBasicComponent);

            return Ok(result);
        }

        [HttpGet("GetPayrollBasicComponentByPayrollProcessingMethodId/{payrollProcessingMethodId}")]
        public async Task<ActionResult<IEnumerable<PayrollBasicComponent>>> GetPayrollBasicComponentByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            var basicComponentsList = await payrollBasicComponentService.GetPayrollBasicComponentByPayrollProcessingMethodId(payrollProcessingMethodId);

            return Ok(basicComponentsList);
        }
    }
}