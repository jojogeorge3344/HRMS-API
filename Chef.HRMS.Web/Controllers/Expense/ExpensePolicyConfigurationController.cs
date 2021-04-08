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
    [Route("api/settings/Expense/[controller]")]
    public class ExpensePolicyConfigurationController : ControllerBase
    {
        private readonly IExpensePolicyConfigurationService expensePolicyConfigurationService;

        public ExpensePolicyConfigurationController(IExpensePolicyConfigurationService expensePolicyConfigurationService)
        {
            this.expensePolicyConfigurationService = expensePolicyConfigurationService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var expensePolicyConfiguration = await expensePolicyConfigurationService.GetAsync(id);

            if (expensePolicyConfiguration == null)
            {
                return NotFound();
            }

            var result = await expensePolicyConfigurationService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<ExpensePolicyConfiguration>> Get(int id)
        {
            var expensePolicyConfiguration = await expensePolicyConfigurationService.GetAsync(id);

            if (expensePolicyConfiguration == null)
            {
                return NotFound();
            }

            return Ok(expensePolicyConfiguration);
        }
        [HttpGet("GetExpenseTypesById/{id}")]
        public async Task<ActionResult<ExpensePolicyConfiguration>> GetExpenseTypesById(int id)
        {
            var expensePolicyConfiguration = await expensePolicyConfigurationService.GetExpenseTypesById(id);

            if (expensePolicyConfiguration == null)
            {
                return NotFound();
            }

            return Ok(expensePolicyConfiguration);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<ExpensePolicyConfiguration>>> GetAll()
        {
            var expensePolicyConfiguration = await expensePolicyConfigurationService.GetAllAsync();

            return Ok(expensePolicyConfiguration);
        }
        [HttpGet("GetAll/{id}")]
        public async Task<ActionResult<IEnumerable<ExpensePolicyConfiguration>>> GetAll(int id)
        {
            var expensePolicyConfiguration = await expensePolicyConfigurationService.GetAllAsync(id);

            return Ok(expensePolicyConfiguration);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<ActionResult<int>> Insert(ExpensePolicyExpenseTypeInsert expensePolicyExpenseTypeInsert)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await expensePolicyConfigurationService.InsertAsync(expensePolicyExpenseTypeInsert.ExpensePolicyConfiguration, expensePolicyExpenseTypeInsert.ExpensePolicyConfigurationIds);

            return Ok(result);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(ExpensePolicyConfiguration expensePolicyConfiguration)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await expensePolicyConfigurationService.UpdateAsync(expensePolicyConfiguration);

            return Ok(result);
        }
    }
}