using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/[controller]")]
    [ApiController]
    public class EmployeeBonusController : ControllerBase
    {
        private readonly IEmployeeBonusService employeeBonusService;

        public EmployeeBonusController(IEmployeeBonusService employeeBonusService)
        {
            this.employeeBonusService = employeeBonusService;
        }

        [HttpGet("GetAllBonusByEmployeeId/{employeeId}")]
        public async Task<ActionResult<EmployeeBonus>> GetAllBonusByEmployeeId(int employeeId)
        {
            var employeeBonus = await employeeBonusService.GetAllBonusByEmployeeId(employeeId);

            if (employeeBonus == null)
            {
                return NotFound();
            }

            return Ok(employeeBonus);
        }
        [HttpGet("GetAllBonusByEmployeeIdAndPayrollProcessingMethodId/{employeeId}/{payrollProcessingMethodId}")]
        public async Task<ActionResult<EmployeeBonusView>> GetAllBonusByEmployeeIdAndPayrollProcessingMethodId(int employeeId,int payrollProcessingMethodId)
        {
            var employeeBonus = await employeeBonusService.GetAllBonusByEmployeeIdAndPayrollProcessingMethodId(employeeId, payrollProcessingMethodId);

            if (employeeBonus == null)
            {
                return NotFound();
            }

            return Ok(employeeBonus);
        }


        [HttpGet("GetAllBonusByPayGroupId/{payrollProcessingMethodId}")]
        public async Task<ActionResult<EmployeeBonusView>> GetAllBonusByPayGroupId(int payrollProcessingMethodId)
        {
            var employeeBonus = await employeeBonusService.GetAllBonusByPayGroupId(payrollProcessingMethodId);

            if (employeeBonus == null)
            {
                return NotFound();
            }

            return Ok(employeeBonus);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(EmployeeBonus employeeBonus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await employeeBonusService.InsertAsync(employeeBonus);

            return CreatedAtAction(nameof(Insert), result);
        }

        [HttpPut]
        [Route("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(EmployeeBonus employeeBonus)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await employeeBonusService.UpdateAsync(employeeBonus);

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<EmployeeBonus>>> GetAll()
        {
            var employeeBonusList = await employeeBonusService.GetAllAsync();

            return Ok(employeeBonusList);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var employeeBonus = await employeeBonusService.GetAsync(id);

            if (employeeBonus == null)
            {
                return NotFound();
            }

            var result = await employeeBonusService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpDelete("DeleteAllBonusByEmployeeId/{employeeId}")]
        public async Task<ActionResult<int>> DeleteAllBonusByEmployeeId(int employeeId)
        {
            var result = await employeeBonusService.DeleteAllBonusByEmployeeId(employeeId);

            return Ok(result);
        }
    }
}