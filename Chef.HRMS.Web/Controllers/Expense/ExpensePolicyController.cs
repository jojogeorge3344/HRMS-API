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
    public class ExpensePolicyController : ControllerBase
    {
        private readonly IExpensePolicyService expensePolicyService;

        public ExpensePolicyController(IExpensePolicyService expensePolicyService)
        {
            this.expensePolicyService = expensePolicyService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var expensePolicy = await expensePolicyService.GetAsync(id);

            if (expensePolicy == null)
            {
                return NotFound();
            }

            var result = await expensePolicyService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<ExpensePolicy>> Get(int id)
        {
            var ExpensePolicy = await expensePolicyService.GetAsync(id);

            if (ExpensePolicy == null)
            {
                return NotFound();
            }

            return Ok(ExpensePolicy);
        }

        [HttpPut("UpdateExpensePolicy/{id}/{isConfigured}")]
        public async Task<ActionResult<bool>> UpdateExpensePolicy(int id, bool isConfigured)
        {
            var ExpensePolicy = await expensePolicyService.UpdateExpensePolicy(id, isConfigured);


            return Ok(ExpensePolicy);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<ExpensePolicy>>> GetAll()
        {
            var expensePolicy = await expensePolicyService.GetAllAsync();

            return Ok(expensePolicy);
        }

        [HttpGet("GetAllAssignedExpensePolicy")]
        public async Task<ActionResult<IEnumerable<int>>> GetAllAssignedExpensePolicy()
        {
            var expensePolicy = await expensePolicyService.GetAllAssignedExpensePolicy();

            return Ok(expensePolicy);
        }
        [HttpGet("GetAllConfiguredExpensePolicies")]
        public async Task<ActionResult<IEnumerable<ExpensePolicy>>> GetAllConfiguredExpensePolicies()
        {
            var expensePolicy = await expensePolicyService.GetAllConfiguredExpensePolicies();

            return Ok(expensePolicy);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(ExpensePolicy expensePolicy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            expensePolicy = await expensePolicyService.InsertAsync(expensePolicy);

            return CreatedAtAction(nameof(Insert), expensePolicy);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(ExpensePolicy expensePolicy)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await expensePolicyService.UpdateAsync(expensePolicy);

            return Ok(result);
        }
    }
}