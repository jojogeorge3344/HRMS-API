using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers.Departments
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            this.departmentService = departmentService;
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(Chef.HRMS.Models.Departments departments)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var department = await departmentService.InsertAsync(departments);

            return Ok(department);
        }

        [HttpPut("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(Chef.HRMS.Models.Departments departments)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await departmentService.UpdateAsync(departments);

            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Chef.HRMS.Models.Departments>>> GetAll()
        {
            var departmentList = await departmentService.GetAllAsync();

            return Ok(departmentList);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var departmentdelete = await departmentService.GetAsync(id);

            if (departmentdelete == null)
            {
                return NotFound();
            }

            var result = await departmentService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("IsDepartmentCodeExist/{code}")]
        public async Task<bool> IsDepartmentCodeExist(string code)
        {
            return await departmentService.IsDepartmentCodeExist(code);
        }

        [HttpGet("Get/{id}")]
        public async Task<Chef.HRMS.Models.Departments> GetAsync (int id)
        {
            return await departmentService.GetAsync(id);
        }
    }
}
