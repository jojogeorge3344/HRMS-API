using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/Loan/[controller]")]
    [ApiController]
    public class LoanPaymentController : ControllerBase
    {
        private readonly ILoanPaymentService loanPaymentServices;

        public LoanPaymentController(ILoanPaymentService loanPaymentServices)
        {
            this.loanPaymentServices = loanPaymentServices;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var loanPayment = await loanPaymentServices.GetAsync(id);

            if (loanPayment == null)
            {
                return NotFound();
            }

            var result = await loanPaymentServices.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<LoanPayment>> Get(int id)
        {
            var loanPayment = await loanPaymentServices.GetAsync(id);

            if (loanPayment == null)
            {
                return NotFound();
            }

            return Ok(loanPayment);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<LoanPayment>>> GetAll()
        {
            var loanPayments = await loanPaymentServices.GetAllAsync();

            return Ok(loanPayments);
        }
        [HttpGet("GetAllLoanPaymentByEmployeeId/{employeeId}/{payrollProcessingMethodId}")]
        public async Task<ActionResult<IEnumerable<EmployeeLoanView>>> GetAllLoanPaymentByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            var loanPayments = await loanPaymentServices.GetAllLoanPaymentByEmployeeId(employeeId, payrollProcessingMethodId);

            return Ok(loanPayments);
        }
        [HttpGet("GetAllLoanPaymentByPayrollProcessingMethodId/{payrollProcessingMethodId}")]
        public async Task<ActionResult<IEnumerable<EmployeeLoanView>>> GetAllLoanPaymentByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            var loanPayments = await loanPaymentServices.GetAllLoanPaymentByPayrollProcessingMethodId(payrollProcessingMethodId);

            return Ok(loanPayments);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Insert(IEnumerable<LoanPayment> loanPayment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await loanPaymentServices.InsertAsync(loanPayment);

            return Ok(result);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(LoanPayment loanPayment)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await loanPaymentServices.UpdateAsync(loanPayment);

            return Ok(result);
        }
    }
}