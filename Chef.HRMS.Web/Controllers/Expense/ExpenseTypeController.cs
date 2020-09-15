using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Threading.Tasks;
using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Chef.HRMS.Web.Controllers
{
    [ApiController]
    [Route("api/settings/Expense/[controller]")]
    public class ExpenseTypeController : ControllerBase
    {
        private readonly IExpenseTypeService expenseTypeService;

        public ExpenseTypeController(IExpenseTypeService expenseTypeService)
        {
            this.expenseTypeService = expenseTypeService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var expenseType = await expenseTypeService.GetAsync(id);

            if (expenseType == null)
            {
                return NotFound();
            }

            var result = await expenseTypeService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<ExpenseType>> Get(int id)
        {
            var expenseType = await expenseTypeService.GetAsync(id);

            if (expenseType == null)
            {
                return NotFound();
            }

            return Ok(expenseType);
        }

        [HttpGet("GetAllByExpensePolicyId/{id}")]
        public async Task<ActionResult<ExpenseType>> GetAllByExpensePolicyId(int id)
        {
            var ExpensePolicy = await expenseTypeService.GetAllByExpensePolicyId(id);

            if (ExpensePolicy == null)
            {
                return NotFound();
            }

            return Ok(ExpensePolicy);
        }

        [HttpGet("GetAllAssignedExpenseTypes")]
        public async Task<ActionResult<int>> GetAllAssignedExpenseTypes()
        {
            var ExpensePolicy = await expenseTypeService.GetAllAssignedExpenseTypes();

            if (ExpensePolicy == null)
            {
                return NotFound();
            }

            return Ok(ExpensePolicy);
        }


        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<ExpenseType>>> GetAll()
        {
            var expenseTypees = await expenseTypeService.GetAllAsync();

            return Ok(expenseTypees);
        }


        [HttpGet("GetAllByExpenseCategory/{id}")]
        public async Task<ActionResult<IEnumerable<ExpenseType>>> GetAllByExpenseCategory(int id)
        {
            var expenseTypees = await expenseTypeService.GetAllByExpenseCategory(id);

            return Ok(expenseTypees);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(ExpenseType expenseType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            expenseType = await expenseTypeService.InsertAsync(expenseType);

            return CreatedAtAction(nameof(Insert), expenseType);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(ExpenseType expenseType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await expenseTypeService.UpdateAsync(expenseType);

            return Ok(result);
        }
    }
}