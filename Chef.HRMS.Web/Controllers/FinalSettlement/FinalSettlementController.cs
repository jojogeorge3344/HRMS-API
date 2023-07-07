using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FinalSettlementController : ControllerBase
    {
        private readonly IFinalSettlemetService finalSettlemetService;

        public FinalSettlementController(IFinalSettlemetService finalSettlemetService)
        {
            this.finalSettlemetService = finalSettlemetService;
        }

        [HttpPost("FinalSettlementInsert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> FinalSettlementInsert(FinalSettlement finalSettlement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var settlement = await finalSettlemetService.FinalSettlementInsert(finalSettlement);

            return Ok(settlement);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> FinalSettlementUpdate(FinalSettlement finalSettlement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await finalSettlemetService.FinalSettlementUpdate(finalSettlement);

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<FinalSettlement>>> GetAll()
        {
            var settlementList = await finalSettlemetService.GetAllAsync();

            return Ok(settlementList);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> FinalSettlementDelete(int id)
        {
            var finalSettlement = await finalSettlemetService.FinalSettlementDelete(id);

            if (finalSettlement == null)
            {
                return NotFound();
            }

            var result = await finalSettlemetService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("IsPreviousPayrollProcessed/{PreviousMonth}/{previousYear}/{employeeId}")]
        public async Task<ActionResult<PreviousPayrollProcessDateView>> IsPreviousPayrollProcessed(int PreviousMonth, int previousYear,int employeeId)
        {
            return await finalSettlemetService.IsPreviousPayrollProcessed(PreviousMonth, previousYear, employeeId);
        }

        [HttpGet("GetAllFinalLeaveBalance/{CutOffDateFrom}/{CutOffDateTo}/{employeeId}")]
        public async Task<ActionResult<FianlSettlementLeaveBalanceView>> GetAllFinalLeaveBalance(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId)
        {
            var leaveBalance = await finalSettlemetService.GetAllFinalLeaveBalance(CutOffDateFrom, CutOffDateTo, employeeId);

            return Ok(leaveBalance);
        }

        [HttpGet("GetPayrollComponents/{CutOffDateFrom}/{CutOffDateTo}/{employeeId}")]
        public async Task<ActionResult<IEnumerable<FinalSettlementComponetsView>>> GetPayrollComponents(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId)
        {
            var components = await finalSettlemetService.GetPayrollComponents(CutOffDateFrom, CutOffDateTo, employeeId);

            return Ok(components);
        }

        [HttpPut("UpadteFinalSettlementStatus/{id}/{approveStatus}")]
        public async Task<ActionResult<int>> UpadteFinalSettlementStatus(int id, int approveStatus)
        {
            var status = await finalSettlemetService.UpadteFinalSettlementStatus(id, approveStatus);

            return Ok(status);
        }

        [HttpPost("FinalSettlementProcess")]
        public async Task<IActionResult> FinalSettlementProcess(FinalSettlement finalSettlement)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var processFinalSettlement = await finalSettlemetService.FinalSettlementProcess(finalSettlement);

            return Ok(processFinalSettlement);
        }

        [HttpGet("GetFinalSettlementById/{id}")]
        public async Task<ActionResult<FinalSettlement>> GetFinalSettlementById(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var settlement = await finalSettlemetService.GetFinalSettlementById(id);

            return Ok(settlement);
        }
    }
}
