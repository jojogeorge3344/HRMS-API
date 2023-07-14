using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers;

[Route("api/Repayment/[controller]")]
[ApiController]
public class DeferPaymentController : ControllerBase
{
    private readonly IDeferPaymentService DeferPaymentService;

    public DeferPaymentController(IDeferPaymentService DeferPaymentService)
    {
        this.DeferPaymentService = DeferPaymentService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var DeferPayment = await DeferPaymentService.GetAsync(id);

        if (DeferPayment == null)
        {
            return NotFound();
        }

        var result = await DeferPaymentService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<DeferPayment>> Get(int id)
    {
        var DeferPayment = await DeferPaymentService.GetAsync(id);

        if (DeferPayment == null)
        {
            return NotFound();
        }

        return Ok(DeferPayment);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<DeferPayment>>> GetAll()
    {
        var DeferPayment = await DeferPaymentService.GetAllAsync();

        return Ok(DeferPayment);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(DeferPayment DeferPayment)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await DeferPaymentService.InsertAsync(DeferPayment);

        return Ok(id);
    }

    [HttpPut("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(DeferPayment DeferPayment)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await DeferPaymentService.UpdateAsync(DeferPayment);

        return Ok(result);
    }
}