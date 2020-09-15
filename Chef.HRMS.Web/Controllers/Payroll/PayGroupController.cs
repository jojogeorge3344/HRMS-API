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
    public class PayGroupController : ControllerBase
    {
        private readonly IPayGroupService payGroupService;

        public PayGroupController(IPayGroupService payGroupService)
        {
            this.payGroupService = payGroupService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var result = await payGroupService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PayGroup>> Get(int id)
        {
            var payGroup = await payGroupService.GetAsync(id);

            if (payGroup == null)
            {
                return NotFound();
            }

            return Ok(payGroup);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PayGroup>>> GetAll()
        {
            var payGroups = await payGroupService.GetAllAsync();

            return Ok(payGroups);
        }

        [HttpGet("GetAllAssignedPayGroup")]
        public async Task<ActionResult<IEnumerable<int>>> GetAllAssignedPayGroup()
        {
            var payGroups = await payGroupService.GetAllAssignedPayGroup();

            return Ok(payGroups);
        }
        [HttpGet("GetAllEmployeeByPayGroupId/{paygroupId}/{year}/{month}")]
        public async Task<ActionResult<IEnumerable<EmployeeView>>> GetAllEmployeeByPayGroupId(int paygroupId,int year,int month )
        {
            var payGroups = await payGroupService.GetAllEmployeeByPayGroupId(paygroupId, year, month);

            return Ok(payGroups);
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(PayGroup payGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payGroupService.InsertAsync(payGroup);

            return CreatedAtAction(nameof(Insert), result);
        }

        [HttpPut]
        [Route("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(PayGroup payGroup)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payGroupService.UpdateAsync(payGroup);

            return Ok(result);
        }
    }
}