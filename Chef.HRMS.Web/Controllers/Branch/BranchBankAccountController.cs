using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[ApiController]
[Route("api/settings/branch/bank")]
public class BranchBankAccountController : ControllerBase
{
    private readonly IBranchBankAccountService branchBankAccountService;

    public BranchBankAccountController(IBranchBankAccountService branchBankAccountService)
    {
        this.branchBankAccountService = branchBankAccountService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var branchBankAccount = await branchBankAccountService.GetAsync(id);

        if (branchBankAccount == null)
        {
            return NotFound();
        }

        var result = await branchBankAccountService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<HRMSBranchBankAccount>> Get(int id)
    {
        var branchBankAccount = await branchBankAccountService.GetAsync(id);

        if (branchBankAccount == null)
        {
            return NotFound();
        }

        return Ok(branchBankAccount);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<HRMSBranchBankAccount>>> GetAll()
    {
        var companies = await branchBankAccountService.GetAllAsync();

        return Ok(companies);
    }

    [HttpGet("GetAllByBranch/{branchid}")]
    public async Task<ActionResult<IEnumerable<HRMSBranchBankAccount>>> GetAllByBranch(int branchId)
    {
        var companies = await branchBankAccountService.GetAllByBranch(branchId);

        return Ok(companies);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(HRMSBranchBankAccount branchBankAccount)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await branchBankAccountService.InsertAsync(branchBankAccount);

        return Ok(id);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Update(HRMSBranchBankAccount branchBankAccount)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await branchBankAccountService.UpdateAsync(branchBankAccount);

        return Ok(result);
    }
}