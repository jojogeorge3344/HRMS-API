using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[ApiController]
[Route("api/profile/[controller]")]
public class UniqueIdentificationDetailController : ControllerBase
{
    private readonly IUniqueIdentificationDetailService uniqueIdentificationDetailService;

    public UniqueIdentificationDetailController(IUniqueIdentificationDetailService uniqueIdentificationDetailService)
    {
        this.uniqueIdentificationDetailService = uniqueIdentificationDetailService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var uniqueIdentificationDetail = await uniqueIdentificationDetailService.GetAsync(id);

        if (uniqueIdentificationDetail == null)
        {
            return NotFound();
        }

        var result = await uniqueIdentificationDetailService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<UniqueIdentificationDetail>> Get(int id)
    {
        var uniqueIdentificationDetail = await uniqueIdentificationDetailService.GetAsync(id);

        if (uniqueIdentificationDetail == null)
        {
            return NotFound();
        }

        return Ok(uniqueIdentificationDetail);
    }

    [HttpGet("GetByEmployeeId/{id}")]
    public async Task<ActionResult<UniqueIdentificationDetailView>> GetByEmployeeId(int id)
    {
        var uniqueIdentificationDetail = await uniqueIdentificationDetailService.GetByEmployeeId(id);

        if (uniqueIdentificationDetail == null)
        {
            return NotFound();
        }

        return Ok(uniqueIdentificationDetail);
    }
    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<UniqueIdentificationDetail>>> GetAll()
    {
        var uniqueIdentificationDetails = await uniqueIdentificationDetailService.GetAllAsync();

        return Ok(uniqueIdentificationDetails);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(UniqueIdentificationDetail uniqueIdentificationDetail)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await uniqueIdentificationDetailService.InsertAsync(uniqueIdentificationDetail);

        return Ok(id);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(UniqueIdentificationDetail uniqueIdentificationDetail)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await uniqueIdentificationDetailService.UpdateAsync(uniqueIdentificationDetail);

        return Ok(result);
    }
}