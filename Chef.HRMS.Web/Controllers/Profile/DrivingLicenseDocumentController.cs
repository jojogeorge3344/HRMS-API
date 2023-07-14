using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers.Profile;

[ApiController]
[Route("api/profile/[controller]")]
public class DrivingLicenseDocumentController : ControllerBase
{
    private readonly IDrivingLicenseDocumentService drivingLicenseDocumentService;

    public DrivingLicenseDocumentController(IDrivingLicenseDocumentService drivingLicenseDocumentService)
    {
        this.drivingLicenseDocumentService = drivingLicenseDocumentService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var drivingLicenseDocument = await drivingLicenseDocumentService.GetAsync(id);

        if (drivingLicenseDocument == null)
        {
            return NotFound();
        }

        var result = await drivingLicenseDocumentService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<DrivingLicenseDocument>> Get(int id)
    {
        var drivingLicenseDocument = await drivingLicenseDocumentService.GetAsync(id);

        if (drivingLicenseDocument == null)
        {
            return NotFound();
        }

        return Ok(drivingLicenseDocument);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<DrivingLicenseDocument>>> GetAll()
    {
        var drivingLicenseDocuments = await drivingLicenseDocumentService.GetAllAsync();

        return Ok(drivingLicenseDocuments);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(DrivingLicenseDocument drivingLicenseDocument)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await drivingLicenseDocumentService.InsertAsync(drivingLicenseDocument);

        return Ok(id);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(DrivingLicenseDocument drivingLicenseDocument)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await drivingLicenseDocumentService.UpdateAsync(drivingLicenseDocument);

        return Ok(result);
    }
}
