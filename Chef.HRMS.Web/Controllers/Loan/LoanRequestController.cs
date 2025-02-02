﻿using Chef.HRMS.Models;
using Chef.HRMS.Models.Loan;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoanRequestController : ControllerBase
{
    private readonly ILoanRequestService loanRequestServices;

    public LoanRequestController(ILoanRequestService loanRequestServices)
    {
        this.loanRequestServices = loanRequestServices;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var loanRequest = await loanRequestServices.GetAsync(id);

        if (loanRequest == null)
        {
            return NotFound();
        }

        var result = await loanRequestServices.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<LoanRequest>> Get(int id)
    {
        var loanRequest = await loanRequestServices.GetLoanDetails(id);

        if (loanRequest == null)
        {
            return NotFound();
        }

        return Ok(loanRequest);
    }

    [HttpGet("GetLoanLastRequestId")]
    public async Task<ActionResult<int>> GetLoanLastRequestId()
    {
        var loanRequest = await loanRequestServices.GetLoanLastRequestId();
        return Ok(loanRequest);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<LoanRequest>>> GetAll()
    {
        var loanRequests = await loanRequestServices.GetAllAsync();

        return Ok(loanRequests);
    }

    [HttpGet("GetAllLoanByPayrollProcessingMethodId/{payrollProcessingMethodId}")]
    public async Task<ActionResult<IEnumerable<EmployeeLoanView>>> GetAllLoanByPayrollProcessingMethodId(int payrollProcessingMethodId)
    {
        var loanRequests = await loanRequestServices.GetAllLoanByPayrollProcessingMethodId(payrollProcessingMethodId);

        return Ok(loanRequests);
    }

    [HttpGet("GetAllLoanByEmployeeId/{employeeId}/{payrollProcessingMethodId}")]
    public async Task<ActionResult<IEnumerable<EmployeeLoanView>>> GetAllLoanByEmployeeId(int employeeId, int payrollProcessingMethodId)
    {
        var loanRequests = await loanRequestServices.GetAllLoanByEmployeeId(employeeId, payrollProcessingMethodId);

        return Ok(loanRequests);
    }

    [HttpGet("GetRequestedDateByEmployeeId/{employeeId}")]
    public async Task<ActionResult<IEnumerable<LoanRequestedViewModel>>> GetRequestedDateByEmployeeId(int employeeId)
    {
        var loanRequests = await loanRequestServices.GetRequestedDateByEmployeeId(employeeId);

        return Ok(loanRequests);
    }

    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Insert(LoanRequest loanRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await loanRequestServices.InsertLoan(loanRequest);

        return Ok(id);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Update(LoanRequest loanRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await loanRequestServices.UpdateAsync(loanRequest);

        return Ok(result);
    }

    [HttpGet("GetLoanRequestDetails/{loanId}")]
    public async Task<ActionResult<LoanRequestDetailsView>> GetLoanRequestDetails(int loanId)
    {
        var loanRequest = await loanRequestServices.GetLoanRequestDetails(loanId);

        if (loanRequest == null)
        {
            return NotFound();
        }

        return Ok(loanRequest);
    }
}