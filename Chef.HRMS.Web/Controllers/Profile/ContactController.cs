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
    public class ContactController : ControllerBase
    {
        private readonly IContactService contactService;

        public ContactController(IContactService contactService)
        {
            this.contactService = contactService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var contact = await contactService.GetAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            var result = await contactService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("GetAllByEmployeeId/{id}")]
        public async Task<ActionResult<Contact>> GetAllByEmployeeId(int id)
        {
            var contact = await contactService.GetAllByEmployeeId(id);

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }
        [HttpGet("Get/{id}")]
        public async Task<ActionResult<Education>> Get(int id)
        {
            var contact = await contactService.GetAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return Ok(contact);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Contact>>> GetAll()
        {
            var contacts = await contactService.GetAllAsync();

            return Ok(contacts);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            contact = await contactService.InsertAsync(contact);

            return CreatedAtAction(nameof(Insert), contact);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(Contact contact)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await contactService.UpdateAsync(contact);

            return Ok(result);
        }
    }
}