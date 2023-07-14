using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/LossOfPay/[controller]")]
[ApiController]
public class LOPCalculationController : ControllerBase
{
    private readonly ILOPCalculationService lopCalculationServices;

    public LOPCalculationController(ILOPCalculationService lopCalculationServices)
    {
        this.lopCalculationServices = lopCalculationServices;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult> Delete(int id)
    {
        var lopCalculation = await lopCalculationServices.GetAsync(id);

        if (lopCalculation == null)
        {
            return NotFound();
        }

        var result = await lopCalculationServices.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<LOPCalculation>> Get(int id)
    {
        var lopCalculation = await lopCalculationServices.GetAsync(id);

        if (lopCalculation == null)
        {
            return NotFound();
        }

        return Ok(lopCalculation);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<LOPCalculation>>> GetAll()
    {
        var lopCalculations = await lopCalculationServices.GetAllAsync();

        return Ok(lopCalculations);
    }

    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Insert(LOPCalculation lopCalculation)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        var calculationexist = await lopCalculationServices.GetAllAsync();
        var result = 0;

        if (calculationexist.Count() == 0)
        {
            var value = await lopCalculationServices.InsertAsync(lopCalculation);
            if (value != null)
            {
                result = 1;
            }
        }
        else
        {
            var lopid = calculationexist.Select(x => x.Id).FirstOrDefault();
            lopCalculation.Id = lopid;
            result = await lopCalculationServices.UpdateAsync(lopCalculation);
        }

        return Ok(result);
    }

    [HttpPut("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> Update(LOPCalculation lopCalculation)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await lopCalculationServices.UpdateAsync(lopCalculation);

        return Ok(result);
    }
}