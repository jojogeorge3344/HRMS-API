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
public class PassportController : ControllerBase
{
    private readonly IPassportService passportService;

    public PassportController(IPassportService passportService)
    {
        this.passportService = passportService;
    }

    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var passport = await passportService.GetAsync(id);

        if (passport == null)
        {
            return NotFound();
        }

        var result = await passportService.DeleteAsync(id);

        return Ok(result);
    }

    [HttpGet("Get/{id}")]
    public async Task<ActionResult<Passport>> Get(int id)
    {
        var passport = await passportService.GetAsync(id);

        if (passport == null)
        {
            return NotFound();
        }

        return Ok(passport);
    }

    [HttpGet("GetByEmployeeId/{id}")]
    public async Task<ActionResult<PassportView>> GetByEmployeeId(int id)
    {
        var passport = await passportService.GetByEmployeeId(id);

        if (passport == null)
        {
            return NotFound();
        }

        return Ok(passport);
    }

    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<Passport>>> GetAll()
    {
        var passports = await passportService.GetAllAsync();

        return Ok(passports);
    }

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [Route("Insert")]
    public async Task<IActionResult> Insert(Passport passport)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var id = await passportService.InsertAsync(passport);

        return Ok(id);

    }

    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(Passport passport)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await passportService.UpdateAsync(passport);

        return Ok(result);
    }
}