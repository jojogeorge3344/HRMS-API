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
    public class PassportDocumentController : ControllerBase
    {
        private readonly IPassportDocumentService passportDocumentService;

        public PassportDocumentController(IPassportDocumentService passportDocumentService)
        {
            this.passportDocumentService = passportDocumentService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var passportDocument = await passportDocumentService.GetAsync(id);

            if (passportDocument == null)
            {
                return NotFound();
            }

            var result = await passportDocumentService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PassportDocument>> Get(int id)
        {
            var passportDocument = await passportDocumentService.GetAsync(id);

            if (passportDocument == null)
            {
                return NotFound();
            }

            return Ok(passportDocument);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PassportDocument>>> GetAll()
        {
            var passportDocuments = await passportDocumentService.GetAllAsync();

            return Ok(passportDocuments);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(PassportDocument passportDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            passportDocument = await passportDocumentService.InsertAsync(passportDocument);

            return CreatedAtAction(nameof(Insert), passportDocument);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(PassportDocument passportDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await passportDocumentService.UpdateAsync(passportDocument);

            return Ok(result);
        }
    }
}