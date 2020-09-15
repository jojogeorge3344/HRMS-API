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
    public class EducationDocumentController : ControllerBase
    {
        private readonly IEducationDocumentService educationDocumentService;

        public EducationDocumentController(IEducationDocumentService educationDocumentService)
        {
            this.educationDocumentService = educationDocumentService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var educationDocument = await educationDocumentService.GetAsync(id);

            if (educationDocument == null)
            {
                return NotFound();
            }

            var result = await educationDocumentService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<EducationDocument>> Get(int id)
        {
            var educationDocument = await educationDocumentService.GetAsync(id);

            if (educationDocument == null)
            {
                return NotFound();
            }

            return Ok(educationDocument);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<EducationDocument>>> GetAll()
        {
            var educationDocuments = await educationDocumentService.GetAllAsync();

            return Ok(educationDocuments);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(EducationDocument educationDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            educationDocument = await educationDocumentService.InsertAsync(educationDocument);

            return CreatedAtAction(nameof(Insert), educationDocument);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(EducationDocument educationDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await educationDocumentService.UpdateAsync(educationDocument);

            return Ok(result);
        }
    }
}