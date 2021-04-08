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
    public class UniqueIdentificationDocumentController : ControllerBase
    {
        private readonly IUniqueIdentificationDocumentService uniqueIdentificationDocumentService;

        public UniqueIdentificationDocumentController(IUniqueIdentificationDocumentService uniqueIdentificationDocumentService)
        {
            this.uniqueIdentificationDocumentService = uniqueIdentificationDocumentService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var uniqueIdentificationDocument = await uniqueIdentificationDocumentService.GetAsync(id);

            if (uniqueIdentificationDocument == null)
            {
                return NotFound();
            }

            var result = await uniqueIdentificationDocumentService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<UniqueIdentificationDocument>> Get(int id)
        {
            var uniqueIdentificationDocument = await uniqueIdentificationDocumentService.GetAsync(id);

            if (uniqueIdentificationDocument == null)
            {
                return NotFound();
            }

            return Ok(uniqueIdentificationDocument);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<UniqueIdentificationDocument>>> GetAll()
        {
            var uniqueIdentificationDocuments = await uniqueIdentificationDocumentService.GetAllAsync();

            return Ok(uniqueIdentificationDocuments);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(UniqueIdentificationDocument uniqueIdentificationDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            uniqueIdentificationDocument = await uniqueIdentificationDocumentService.InsertAsync(uniqueIdentificationDocument);

            return CreatedAtAction(nameof(Insert), uniqueIdentificationDocument);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(UniqueIdentificationDocument uniqueIdentificationDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await uniqueIdentificationDocumentService.UpdateAsync(uniqueIdentificationDocument);

            return Ok(result);
        }
    }
}