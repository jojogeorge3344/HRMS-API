using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/payroll/[controller]")]
    [ApiController]
    public class PayrollComponentController : ControllerBase
    {
        private readonly IPayrollComponentService payrollComponentService;

        public PayrollComponentController(IPayrollComponentService payrollComponentService)
        {
            this.payrollComponentService = payrollComponentService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var result = await payrollComponentService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PayrollComponent>> Get(int id)
        {
            var payrollComponent = await payrollComponentService.GetAsync(id);

            if (payrollComponent == null)
            {
                return NotFound();
            }

            return Ok(payrollComponent);
        }
        [HttpGet("GetAllAssignedPayrollComponents")]
        public async Task<ActionResult<IEnumerable<int>>> GetAllAssignedPayrollComponents()
        {
            var payrollComponents = await payrollComponentService.GetAllAssignedPayrollComponents();

            return Ok(payrollComponents);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PayrollComponent>>> GetAll()
        {
            var payrollComponents = await payrollComponentService.GetAllAsync();

            return Ok(payrollComponents);
        }
        [HttpGet("GetAllOrderByPayrollComponent")]
        public async Task<ActionResult<IEnumerable<PayrollComponent>>> GetAllOrderByPayrollComponent()
        {
            var payrollComponents = await payrollComponentService.GetAllOrderByPayrollComponent();

            return Ok(payrollComponents);
        }

        [HttpGet("GetAllPayrollComponentByType/{id}")]
        public async Task<ActionResult<IEnumerable<PayrollComponent>>> GetAllPayrollComponentByType(int id)
        {
            var payrollComponentConfigurations = await payrollComponentService.GetAllPayrollComponentByType(id);

            return Ok(payrollComponentConfigurations);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(PayrollComponent payrollComponent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollComponentService.InsertAsync(payrollComponent);

            return CreatedAtAction(nameof(Insert), result);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(PayrollComponent payrollComponent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollComponentService.UpdateAsync(payrollComponent);

            return Ok(result);
        }
    }
}