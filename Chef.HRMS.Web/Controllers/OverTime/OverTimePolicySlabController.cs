using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OverTimePolicySlabController : ControllerBase
{
    private readonly IOverTimePolicySlabService overTimePolicySlabService;

    public OverTimePolicySlabController(IOverTimePolicySlabService overTimePolicySlabService)
    {
        this.overTimePolicySlabService = overTimePolicySlabService;
    }
    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Insert(OverTimeSlab overTimeSlab)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var slab = await overTimePolicySlabService.InsertAsync(overTimeSlab);

        return CreatedAtAction(nameof(Insert), slab);
    }
    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(OverTimeSlab overTimeSlab)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await overTimePolicySlabService.UpdateAsync(overTimeSlab);

        return Ok(result);
    }
    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<OverTimeSlab>>> GetAll()
    {
        var slab = await overTimePolicySlabService.GetAllAsync();

        return Ok(slab);
    }
    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var slab = await overTimePolicySlabService.GetAsync(id);

        if (slab == null)
        {
            return NotFound();
        }

        var result = await overTimePolicySlabService.DeleteAsync(id);

        return Ok(result);
    }
    [HttpGet("IsOverTimePolicyCodeExist/{code}")]
    public async Task<bool> IsOverTimePolicyCodeExist(string code)
    {
        return await overTimePolicySlabService.IsOverTimePolicyCodeExist(code);
    }
    [HttpGet("GetOverTimeBenefitTypes")]
    public async Task<ActionResult<IEnumerable<BenefitTypes>>> GetOverTimeBenefitTypes()
    {
        var type = await overTimePolicySlabService.GetOverTimeBenefitTypes();

        return Ok(type);
    }

    [HttpGet("GetOverTimeComponentDetails/{overtimepolicyid}")]
    public async Task<ActionResult<IEnumerable<OverTimeSlab>>> GetOverTimeComponentDetails(int overtimepolicyid)
    {
        var overTime = await overTimePolicySlabService.GetOverTimeComponentDetails(overtimepolicyid);

        return Ok(overTime);
    }
}
