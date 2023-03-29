using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/payroll/[controller]")]
    [ApiController]
    public class PayrollStructureController : ControllerBase
    {
        private readonly ILogger<PayrollStructureController> _logger;
        private readonly IPayrollStructureService payrollStructureService;

        public PayrollStructureController(IPayrollStructureService payrollStructureService, ILogger<PayrollStructureController> logger)
        {
            this.payrollStructureService = payrollStructureService;
            _logger = logger;
            _logger.LogDebug(1, "NLog injected into SalaryStructureController");
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var result = await payrollStructureService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PayrollStructure>> Get(int id)
        {
            _logger.LogInformation($"Enter into Get SalaryStructure by id is {id} ");
            var payrollStructure = await payrollStructureService.GetAsync(id);

            if (payrollStructure == null)
            {
                _logger.LogError("Null value return");
                return NotFound();
            }

            _logger.LogTrace("Successfully excited from function GetSalaryStructurebyid");

            return Ok(payrollStructure);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PayrollStructure>>> GetAll()
        {
            var payrollStructures = await payrollStructureService.GetAllAsync();

            return Ok(payrollStructures);
        }

        [HttpGet("GetAllAssignedPayrollStructure")]
        public async Task<ActionResult<IEnumerable<int>>> GetAllAssignedPayrollStructure()
        {
            var payrollStructures = await payrollStructureService.GetAllAssignedPayrollStructure();

            return Ok(payrollStructures);
        }

        [HttpGet("GetAllConfiguredPayrollStructures")]
        public async Task<ActionResult<IEnumerable<PayrollStructure>>> GetAllConfiguredPayrollStructures()
        {
            var payrollStructures = await payrollStructureService.GetAllConfiguredPayrollStructures();

            return Ok(payrollStructures);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(PayrollStructure payrollStructure)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollStructureService.InsertAsync(payrollStructure);

            return CreatedAtAction(nameof(Insert), result);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(PayrollStructure payrollStructure)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollStructureService.UpdateAsync(payrollStructure);

            return Ok(result);
        }
        [HttpPut("UpdatePayrollStructure/{id}/{isConfigured}")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdatePayrollStructure(int id, bool isConfigured)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollStructureService.UpdatePayrollStructure(id, isConfigured);

            return Ok(result);
        }
        [HttpGet("GetAllActived")]
        public async Task<ActionResult<IEnumerable<PayrollStructure>>> GetAllActived()
        {
            var actived = await payrollStructureService.GetAllActived();

            return Ok(actived);
        }
    }
}