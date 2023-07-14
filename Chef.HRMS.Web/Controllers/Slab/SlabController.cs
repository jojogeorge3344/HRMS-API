using Chef.HRMS.Models;
using Chef.HRMS.Models.Slab;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/[controller]")]
[ApiController]
public class SlabController : ControllerBase
{
    private readonly ISlabService slabService;

    public SlabController(ISlabService slabService)
    {
        this.slabService = slabService;
    }
    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Insert(Slab slab)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var slabdetails = await slabService.InsertAsync(slab);

        return CreatedAtAction(nameof(Insert), slabdetails);
    }
    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(Slab slab)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await slabService.UpdateAsync(slab);

        return Ok(result);
    }
    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<Slab>>> GetAll()
    {
        var slablist = await slabService.GetAllAsync();

        return Ok(slablist);
    }
    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var slabdetails = await slabService.GetAsync(id);

        if (slabdetails == null)
        {
            return NotFound();
        }

        var result = await slabService.DeleteAsync(id);

        return Ok(result);
    }
}
