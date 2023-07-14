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
public class UserVariableValuesController : ControllerBase
{
    private readonly IUserVariableValuesService userVariableValuesService;

    public UserVariableValuesController(IUserVariableValuesService userVariableValuesService)
    {
        this.userVariableValuesService = userVariableValuesService;
    }
    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Insert(UserVariableValues userVariableValues)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var userVariableDetails = await userVariableValuesService.InsertAsync(userVariableValues);

        return CreatedAtAction(nameof(Insert), userVariableDetails);
    }
    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(UserVariableValues userVariableValues)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await userVariableValuesService.UpdateAsync(userVariableValues);

        return Ok(result);
    }
    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<UserVariableValues>>> GetAll()
    {
        var userVariableList = await userVariableValuesService.GetAllAsync();

        return Ok(userVariableList);
    }
    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var userVariabledelete = await userVariableValuesService.GetAsync(id);

        if (userVariabledelete == null)
        {
            return NotFound();
        }

        var result = await userVariableValuesService.DeleteAsync(id);

        return Ok(result);
    }
    [HttpGet("Get/{id}")]
    public async Task<ActionResult<UserVariableValues>> Get(int id)
    {
        var userVariable = await userVariableValuesService.GetAsync(id);

        if (userVariable == null)
        {
            return NotFound();
        }

        return Ok(userVariable);
    }
    [HttpGet("GetUserVariables")]
    public async Task<ActionResult<IEnumerable<UserVariable>>> GetUserVariables()
    {
        var userVariablelist = await userVariableValuesService.GetUserVariables();

        return Ok(userVariablelist);
    }
}
