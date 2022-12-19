using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [ApiController]
    [Route("api/profile/[controller]")]
    public class EmployeeBankAccountController : ControllerBase
    {
        private readonly IEmployeeBankAccountService employeeBankAccountService;

        public EmployeeBankAccountController(IEmployeeBankAccountService employeeBankAccountService)
        {
            this.employeeBankAccountService = employeeBankAccountService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var employeeBankAccount = await employeeBankAccountService.GetAsync(id);

            if (employeeBankAccount == null)
            {
                return NotFound();
            }

            var result = await employeeBankAccountService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<EmployeeBankAccount>> Get(int id)
        {
            var employeeBankAccount = await employeeBankAccountService.GetAsync(id);

            if (employeeBankAccount == null)
            {
                return NotFound();
            }

            return Ok(employeeBankAccount);
        }
        [HttpGet("GetBankAccountByEmployeeId/{id}")]
        public async Task<ActionResult<EmployeeBankAccount>> GetBankAccountByEmployeeId(int id)
        {
            var employeeBankAccount = await employeeBankAccountService.GetBankAccountByEmployeeId(id);

            if (employeeBankAccount == null)
            {
                return NotFound();
            }

            return Ok(employeeBankAccount);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<EmployeeBankAccount>>> GetAll()
        {
            var employeeBankAccounts = await employeeBankAccountService.GetAllAsync();

            return Ok(employeeBankAccounts);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(EmployeeBankAccount employeeBankAccount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await employeeBankAccountService.InsertAsync(employeeBankAccount);

            return Ok(id);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(EmployeeBankAccount employeeBankAccount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await employeeBankAccountService.UpdateAsync(employeeBankAccount);

            return Ok(result);
        }
    }
}