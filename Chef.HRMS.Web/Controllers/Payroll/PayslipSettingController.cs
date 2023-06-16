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

        [HttpGet("GetAllPayslipSettingsDetails")]
        public async Task<ActionResult<IEnumerable<PayslipSetting>>> GetAllPayslipSettingsDetails()
        {
            var payslipList = await payslipSettingService.GetAllPayslipSettingsDetails();

            return Ok(payslipList);
        }

        [HttpDelete("DeletePayslipSetting/{id}")]
        public async Task<ActionResult<int>> DeletePayslipSetting(int id)
        {
            var result = await payslipSettingService.DeletePayslipSetting(id);

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

        [HttpGet("GetAllPayrollStructure")]
        public async Task<ActionResult<IEnumerable<PayrollStructure>>> GetAllPayrollStructure()
        {
            var payrollStructure = await payslipSettingService.GetAllPayrollStructure();

            if (payrollStructure == null)
            {
                return NotFound();
            }

            return Ok(payrollStructure);
        }

        [HttpGet("GetPayslipSettingById/{id}")]
        public async Task<ActionResult<IEnumerable<PayslipSettingView>>> GetPayslipSettingById(int id)
        {
            var payslip = await payslipSettingService.GetPayslipSettingById(id);

            return Ok(payslip);
        }

        [HttpGet("IsPayslipSettingCodeExist/{code}")]
        public async Task<bool> IsPayslipSettingCodeExist(string code)
        {
            return await payslipSettingService.IsPayslipSettingCodeExist(code);
        }
    }
}
