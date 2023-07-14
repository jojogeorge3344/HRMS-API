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
public class VisaDesignationController : ControllerBase
{
    private readonly IVisaDesignationService visaDesignationService;

    public VisaDesignationController(IVisaDesignationService visaDesignationService)
    {
        this.visaDesignationService = visaDesignationService;
    }
    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Insert(VisaDesignation visaDesignation)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var designation = await visaDesignationService.InsertAsync(visaDesignation);

        return CreatedAtAction(nameof(Insert), designation);
    }
    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(VisaDesignation visaDesignation)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await visaDesignationService.UpdateAsync(visaDesignation);

        return Ok(result);
    }
    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<VisaDesignation>>> GetAll()
    {
        var designationList = await visaDesignationService.GetAllAsync();

        return Ok(designationList);
    }
    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var designation = await visaDesignationService.GetAsync(id);

        if (designation == null)
        {
            return NotFound();
        }

        var result = await visaDesignationService.DeleteAsync(id);

        return Ok(result);
    }
}
