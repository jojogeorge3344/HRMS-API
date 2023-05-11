using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/payrollprocessing/[controller]")]
    [ApiController]
    public class PayrollProcessingMethodController : ControllerBase
    {
        private readonly IPayrollProcessingMethodService payrollProcessingMethodService;

        public PayrollProcessingMethodController(IPayrollProcessingMethodService payrollProcessingMethodService)
        {
            this.payrollProcessingMethodService = payrollProcessingMethodService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var result = await payrollProcessingMethodService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PayrollProcessingMethod>> Get(int id)
        {
            var payrollProcessingMethod = await payrollProcessingMethodService.GetAsync(id);

            if (payrollProcessingMethod == null)
            {
                return NotFound();
            }

            return Ok(payrollProcessingMethod);
        }

        [HttpGet("GetDetailsById/{employeeid}/{month}/{year}")]
        public async Task<ActionResult<int>> GetDetailsById(int employeeid, int month, int year)
        {
            var payrollProcessingMethod = await payrollProcessingMethodService.GetDetailsById(employeeid, month, year);

            return Ok(payrollProcessingMethod);
        }

        [HttpPut("UpadtePayrollProcessingStep/{id}/{stepNumber}")]
        public async Task<ActionResult<int>> UpadtePayrollProcessingStep(int id, int stepNumber)
        {
            var payrollProcessingMethod = await payrollProcessingMethodService.UpadtePayrollProcessingStep(id, stepNumber);

            return Ok(payrollProcessingMethod);
        }

        [HttpPost("InsertOrAlreadyExist")]
        public async Task<ActionResult<string>> InsertOrAlreadyExist(PayrollProcessingMethod payrollProcessingMethod)
        {
            var result = await payrollProcessingMethodService.InsertOrAlreadyExist(payrollProcessingMethod);

            return Ok(result);
        }

        [HttpPost("InsertLOPDeduction")]
        public async Task<ActionResult<int>> InsertLOPDeduction(IEnumerable<LOPDeduction> lopDeduction)
        {
            var result = await payrollProcessingMethodService.InsertLOPDeduction(lopDeduction);

            return Ok(result);
        }

        [HttpGet("GetPayBreakUpByEmployeeId/{id}/{payrollProcessingMethodId}")]
        public async Task<ActionResult<PayrollReviewBreakup>> GetPayBreakUpByEmployeeId(int id, int payrollProcessingMethodId)
        {
            var payrollProcessingMethod = await payrollProcessingMethodService.GetPayBreakUpByEmployeeId(id, payrollProcessingMethodId);

            if (payrollProcessingMethod == null)
            {
                return NotFound();
            }

            return Ok(payrollProcessingMethod);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PayrollProcessingMethod>>> GetAll()
        {
            var payrollProcessingMethodList = await payrollProcessingMethodService.GetAllAsync();

            return Ok(payrollProcessingMethodList);
        }

        [HttpGet("GetAllPayrollReviewByProcessingMethodId/{payrollProcessingMethodId}")]
        public async Task<ActionResult<IEnumerable<PayrollReview>>> GetAllPayrollReviewByProcessingMethodId(int payrollProcessingMethodId)
        {
            var payrollProcessingMethodList = await payrollProcessingMethodService.GetAllPayrollReviewByProcessingMethodId(payrollProcessingMethodId);

            return Ok(payrollProcessingMethodList);
        }
        [HttpGet("GetAllUnProcessedEmployees/{year}/{month}")]
        public async Task<ActionResult<IEnumerable<HRMSEmployee>>> GetAllUnProcessedEmployees(int year, int month)
        {
            var unProcessedEmployees = await payrollProcessingMethodService.GetAllUnProcessedEmployees(year, month);

            return Ok(unProcessedEmployees);
        }
        [HttpGet("GetPastSixMonthDetails")]
        public async Task<ActionResult<IEnumerable<PayrollProcessingMethod>>> GetPastSixMonthDetails()
        {
            var payrollProcessingMethodList = await payrollProcessingMethodService.GetPastSixMonthDetails();

            return Ok(payrollProcessingMethodList);
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(PayrollProcessingMethod payrollProcessingMethod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollProcessingMethodService.InsertAsync(payrollProcessingMethod);

            return CreatedAtAction(nameof(Insert), result);
        }

        [HttpPut]
        [Route("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(PayrollProcessingMethod payrollProcessingMethod)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await payrollProcessingMethodService.UpdateAsync(payrollProcessingMethod);

            return Ok(result);
        }

        [HttpGet("GetEmployeeDetails/{employeeid}/{paygroupid}")]
        public async Task<ActionResult<IEnumerable<PayrollProcessingMethod>>> GetEmployeeDetails(int employeeid,int paygroupid)
        {
            var noGroupEmployee = await payrollProcessingMethodService.GetEmployeeDetails(employeeid, paygroupid);

            return Ok(noGroupEmployee);
        }

        [HttpGet("GetPayrollSalarySummary/{paygroupid}")]
        public async Task<ActionResult<List<PayrollSummary>>> GetPayrollComponentSummary(int paygroupid)
        {
            var noGroupEmployee = await payrollProcessingMethodService.GetEmployeeDetails(employeeid, paygroupid);
            List<PayrollSummary> pSummary = new List<PayrollSummary>();
            return Ok(pSummary);
        }

        [HttpPost("InsertPayrollFixedComponentDetails/{paygroupid}/{payrollprocessid}/{payrollprocessdate}")]
        public async Task<ActionResult<int>> InsertPayrollFixedComponentDetails(int paygroupid, int payrollprocessid, DateTime payrollprocessdate)
        {
            var result = await payrollProcessingMethodService.InsertPayrollFixedComponentDetaisl(payrollprocessid, payrollprocessdate,paygroupid);
            return Ok(result);
        }
    }
}