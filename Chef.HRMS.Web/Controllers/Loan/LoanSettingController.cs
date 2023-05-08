using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers.Loan
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoanSettingController : ControllerBase
    {
        private readonly ILoanSettingService loanSettingServices;

        public LoanSettingController(ILoanSettingService LoanSettingServices)
        {
            this.loanSettingServices = LoanSettingServices;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var LoanSetting = await loanSettingServices.GetAsync(id);

            if (LoanSetting == null)
            {
                return NotFound();
            }

            var result = await loanSettingServices.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<LoanSetting>> Get(int id)
        {
            var LoanSetting = await loanSettingServices.GetAsync(id);

            if (LoanSetting == null)
            {
                return NotFound();
            }

            return Ok(LoanSetting);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<LoanSetting>>> GetAll()
        {
            var LoanSettings = await loanSettingServices.GetAllAsync();

            return Ok(LoanSettings);
        }

        [HttpGet("GetLoanSettingId")]
        public async Task<ActionResult<int>> GetLoanSettingId()
        {
            var loanSettingId = await loanSettingServices.GetLoanSettingId();

            return Ok(loanSettingId);
        }
        [HttpGet("Get")]
        public async Task<ActionResult<LoanSetting>> GetTopOneLoanSetting()
        {
            var loanSetting = await loanSettingServices.GetTopOneLoanSetting();

            return Ok(loanSetting);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Insert(LoanSetting LoanSetting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await loanSettingServices.InsertAsync(LoanSetting);

            return Ok(id);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(LoanSetting LoanSetting)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await loanSettingServices.UpdateAsync(LoanSetting);

            return Ok(result);
        }

        [HttpGet("GetLoanRepayment")]
        public async Task<ActionResult<IEnumerable<LoanAdvanceRepaymentView>>> GetLoanRepayment()
        {
            var deduction = await loanSettingServices.GetLoanRepayment();

            return Ok(deduction);
        }

        [HttpGet("GetLoanAdvance")]
        public async Task<ActionResult<IEnumerable<LoanAdvanceRepaymentView>>> GetLoanAdvance()
        {
            var advance = await loanSettingServices.GetLoanAdvance();

            return Ok(advance);
        }
    }
}