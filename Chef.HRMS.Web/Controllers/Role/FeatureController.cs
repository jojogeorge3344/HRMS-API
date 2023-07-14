using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[ApiController]
[Route("api/settings/[controller]")]
public class FeatureController : ControllerBase
{
    private readonly IFeatureService featureService;

    public FeatureController(IFeatureService featureService)
    {
        this.featureService = featureService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var feature = await featureService.GetAsync(id);

        if (feature == null)
        {
            return NotFound();
        }

        var result = await featureService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<Feature>> Get(int id)
    {
        var feature = await featureService.GetAsync(id);

        if (feature == null)
        {
            return NotFound();
        }

        return Ok(feature);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<Feature>>> GetAll()
    {
        var featurees = await featureService.GetAllAsync();

        return Ok(featurees);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(Feature feature)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

       var id = await featureService.InsertAsync(feature);

        return Ok(id);
    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(Feature Feature)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await featureService.UpdateAsync(Feature);

        return Ok(result);
    }
}