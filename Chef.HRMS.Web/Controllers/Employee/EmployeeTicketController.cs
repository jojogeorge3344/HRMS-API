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
    public class EmployeeTicketController : ControllerBase
    {
        private readonly IEmployeeTicketService EmployeeTicketService;

        public EmployeeTicketController(IEmployeeTicketService EmployeeTicketService)
        {
            this.EmployeeTicketService = EmployeeTicketService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var EmployeeTicket = await EmployeeTicketService.GetAsync(id);

            if (EmployeeTicket == null)
            {
                return NotFound();
            }

            var result = await EmployeeTicketService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<EmployeeTicket>> Get(int id)
        {
            var EmployeeTicket = await EmployeeTicketService.GetAsync(id);

            if (EmployeeTicket == null)
            {
                return NotFound();
            }

            return Ok(EmployeeTicket);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<EmployeeTicket>>> GetAll()
        {
            var EmployeeTickets = await EmployeeTicketService.GetAllAsync();

            return Ok(EmployeeTickets);
        }
 

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(EmployeeTicket employeeTicket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var employeeTic =await EmployeeTicketService.InsertAsync(employeeTicket);
            return CreatedAtAction(nameof(Insert), employeeTic);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Update(EmployeeTicket EmployeeTicket)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await EmployeeTicketService.UpdateAsync(EmployeeTicket);

            return Ok(result);
        }

        [HttpGet("GetTicketDetailsByemployeeId/{employeeId}")]
        public async Task<ActionResult<IEnumerable<EmployeeTicket>>> GetTicketDetailsByemployeeId(int employeeId)
        {
            var jobTicket = await EmployeeTicketService.GetTicketDetailsByemployeeId(employeeId);

            return Ok(jobTicket);
        }
    }
}