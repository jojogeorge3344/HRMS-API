﻿using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AssetRaiseRequestController : ControllerBase
{
    private readonly IAssetRaiseRequestService assetRaiseRequestService;

    public AssetRaiseRequestController(IAssetRaiseRequestService assetRaiseRequestService)
    {
        this.assetRaiseRequestService = assetRaiseRequestService;
    }

    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Insert(AssetRaiseRequest assetRaiseRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        string slNo=await assetRaiseRequestService.GenerateNewDocumentNumberAsync("REQ");
        assetRaiseRequest.RequestNo = slNo;
        var result = await assetRaiseRequestService.InsertAsync(assetRaiseRequest);
        return Ok(result);
    }

    [HttpPut("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Update(AssetRaiseRequest assetRaiseRequest)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await assetRaiseRequestService.UpdateAsync(assetRaiseRequest);

        return Ok(result);
    }
    [HttpPut("UpdateRevoke")]
    public async Task<ActionResult> UpdateRevoke(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await assetRaiseRequestService.UpdateRevoke(id);

        return Ok(result);
    }
    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var AssetType = await assetRaiseRequestService.GetAsync(id);

        if (AssetType == null)
        {
            return NotFound();
        }

        var result = await assetRaiseRequestService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("GetAllRaiseRequestList/{empid}")]
    public async Task<ActionResult<IEnumerable<AssetRaiseRequest>>> GetAllRaiseRequestList(int empid)
    {
        var AssetRaiseRequest = await assetRaiseRequestService.GetAllRaiseRequestList(empid);

        return Ok(AssetRaiseRequest);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<IEnumerable<AssetRaiseRequest>>> Get(int id)
    {
        var AssetRaiseRequest = await assetRaiseRequestService.Get(id);

        return Ok(AssetRaiseRequest);
    }
    //[HttpGet("GetEmployeeDepartmentDetails/{id}")]
    //public async Task<ActionResult<IEnumerable<AssetRaiseRequest>>> GetEmployeeDepartmentDetails(int id)
    //{
    //    var AssetRaiseRequest = await assetRaiseRequestService.GetEmployeeDepartmentDetails(id);

    //    return Ok(AssetRaiseRequest);
    //}
    [HttpGet("GetEmployeeDetails")]
    public async Task<ActionResult<IEnumerable<AssetEmployeeViewModel>>> GetEmployeeDetails()
    {
        IEnumerable<AssetEmployeeViewModel> assetemployeeList = await assetRaiseRequestService.GetEmployeeDetails();



        return Ok(assetemployeeList);
    }
    [HttpGet("GenerateNewDocumentNumberAsync/{code}")]
    public async Task<ActionResult<string>> GenerateNewDocumentNumberAsync(string code)
    {
        var AssetRaiseRequest = await assetRaiseRequestService.GenerateNewDocumentNumberAsync(code);

        return Ok(AssetRaiseRequest);
    }

}
