using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var employee = await employeeService.GetAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            var result = await employeeService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<HRMSEmployee>> Get(int id)
        {
            var employeeDetails = await employeeService.GetAsync(id);

            if (employeeDetails == null)
            {
                return NotFound();
            }

            return Ok(employeeDetails);
        }
        [HttpGet("GetEmployeeDetailsById/{id}")]
        public async Task<ActionResult<HRMSEmployee>> GetEmployeeDetailsById(int id)
        {
            var employeeDetails = await employeeService.GetEmployeeDetailsById(id);

            if (employeeDetails == null)
            {
                return NotFound();
            }

            return Ok(employeeDetails);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<HRMSEmployee>>> GetAll()
        {
            var employeeList = await employeeService.GetAllAsync();

            return Ok(employeeList);
        }

        [HttpGet("GetAllEmployeeDetails")]
        public async Task<ActionResult<IEnumerable<EmployeeView>>> GetAllEmployeeDetails()
        {
            var employeeDetailsList = await employeeService.GetAllEmployeeDetails();

            return Ok(employeeDetailsList);
        }

        [HttpGet("GetEmployeeDetailsByJobTile/{jobTitleId}")]
        public async Task<ActionResult<IEnumerable<EmployeeView>>> GetEmployeeDetailsByJobTile(int jobTitleId)
        {
            var employeeDetailsList = await employeeService.GetEmployeeDetailsByJobTile(jobTitleId);

            return Ok(employeeDetailsList);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(HRMSEmployee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employeeDetails = await employeeService.InsertAsync(employee);

            return CreatedAtAction(nameof(Insert), employeeDetails);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(HRMSEmployee employee)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await employeeService.UpdateAsync(employee);

            return Ok(result);
        }
        [HttpGet("GetAllNotificationById/{employeeId}")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetAllNotificationById(int employeeId)
        {
            var leaves = await employeeService.GetAllNotificationById(employeeId);

            return Ok(leaves);
        }

        [HttpGet("IsNameExist/{name}")]
        public async Task<bool> IsNameExist(string name)
        {
            return await employeeService.IsNameExist(name);
        }

        [HttpGet("GetLoginEmployee/{employeeId}")]
        public async Task<ActionResult<LoginEmployeeView>> GetLoginEmployee(int employeeId)
        {
            var employee = await employeeService.GetLoginEmployee(employeeId);

            return Ok(employee);
        }
    }
}