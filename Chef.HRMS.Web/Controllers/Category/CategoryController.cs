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
public class CategoryController : ControllerBase
{
    private readonly ICategoryService categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        this.categoryService = categoryService;
    }
    [HttpPost("Insert")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Insert(Category category)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await categoryService.InsertAsync(category);

        return CreatedAtAction(nameof(Insert), result);
    }
    [HttpPost("Update")]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<int>> Update(Category category)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var result = await categoryService.UpdateAsync(category);

        return Ok(result);
    }
    [HttpGet("GetAll")]
    public async Task<ActionResult<IEnumerable<Category>>> GetAll()
    {
        var categoryList = await categoryService.GetAllAsync();

        return Ok(categoryList);
    }
    [HttpDelete("Delete/{id}")]
    public async Task<ActionResult<int>> Delete(int id)
    {
        var delete = await categoryService.GetAsync(id);

        if (delete == null)
        {
            return NotFound();
        }

        var result = await categoryService.DeleteAsync(id);

        return Ok(result);
    }
    [HttpGet("IsCategoryCodeExist/{code}")]
    public async Task<bool> IsCategoryCodeExist(string code)
    {
        return await categoryService.IsCategoryCodeExist(code);
    }
}
