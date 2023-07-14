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
public class DrivingLicenseController : ControllerBase
{
    private readonly IDrivingLicenseService drivingLicenseService;

    public DrivingLicenseController(IDrivingLicenseService drivingLicenseService)
    {
        this.drivingLicenseService = drivingLicenseService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var drivingLicense = await drivingLicenseService.GetAsync(id);

        if (drivingLicense == null)
        {
            return NotFound();
        }

        var result = await drivingLicenseService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<DrivingLicense>> Get(int id)
    {
        var drivingLicense = await drivingLicenseService.GetAsync(id);

        if (drivingLicense == null)
        {
            return NotFound();
        }

        return Ok(drivingLicense);
    }

    [HttpGet("GetByEmployeeId/{id}")]
    public async Task<ActionResult<DrivingLicenseView>> GetByEmployeeId(int id)
    {
        var drivingLicense = await drivingLicenseService.GetByEmployeeId(id);

        if (drivingLicense == null)
        {
            return NotFound();
        }

        return Ok(drivingLicense);
    }


    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<DrivingLicense>>> GetAll()
    {
        var drivingLicenses = await drivingLicenseService.GetAllAsync();

        return Ok(drivingLicenses);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(DrivingLicense drivingLicense)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await drivingLicenseService.InsertAsync(drivingLicense);

        return Ok(id);

    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(DrivingLicense drivingLicense)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await drivingLicenseService.UpdateAsync(drivingLicense);

        return Ok(result);
    }
}