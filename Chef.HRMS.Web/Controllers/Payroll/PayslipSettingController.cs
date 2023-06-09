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
    public class PayslipSettingController : ControllerBase
    {
        private readonly IPayslipSettingService payslipSettingService;

        public PayslipSettingController(IPayslipSettingService payslipSettingService)
        {
            this.payslipSettingService = payslipSettingService;
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Insert(PayslipSetting payslipSetting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var payslipDetails = await payslipSettingService.InsertPayslipSetting(payslipSetting);

            return Ok(payslipDetails);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(PayslipSetting payslipSetting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payslipSettingService.UpdatePayslipSetting(payslipSetting);

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PayslipSetting>>> GetAll()
        {
            var payslipList = await payslipSettingService.GetAllAsync();

            return Ok(payslipList);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var payslipDelete = await payslipSettingService.GetAsync(id);

            if (payslipDelete == null)
            {
                return NotFound();
            }

            var result = await payslipSettingService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("GetComponentsByStructureId/{structureId}")]
        public async Task<ActionResult<IEnumerable<PayrollComponent>>> GetComponentsByStructureId(int structureId)
        {
            var payrollComponent = await payslipSettingService.GetComponentsByStructureId(structureId);

            if (payrollComponent == null)
            {
                return NotFound();
            }

            return Ok(payrollComponent);
        }
    }
}
