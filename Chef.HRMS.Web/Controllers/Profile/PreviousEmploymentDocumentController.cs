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
    public class PreviousEmploymentDocumentController : ControllerBase
    {
        private readonly IPreviousEmploymentDocumentService previousEmploymentDocumentService;

        public PreviousEmploymentDocumentController(IPreviousEmploymentDocumentService previousEmploymentDocumentService)
        {
            this.previousEmploymentDocumentService = previousEmploymentDocumentService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var previousEmploymentDocument = await previousEmploymentDocumentService.GetAsync(id);

            if (previousEmploymentDocument == null)
            {
                return NotFound();
            }

            var result = await previousEmploymentDocumentService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PreviousEmploymentDocument>> Get(int id)
        {
            var previousEmploymentDocument = await previousEmploymentDocumentService.GetAsync(id);

            if (previousEmploymentDocument == null)
            {
                return NotFound();
            }

            return Ok(previousEmploymentDocument);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PreviousEmploymentDocument>>> GetAll()
        {
            var previousEmploymentDocuments = await previousEmploymentDocumentService.GetAllAsync();

            return Ok(previousEmploymentDocuments);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(PreviousEmploymentDocument previousEmploymentDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var id = await previousEmploymentDocumentService.InsertAsync(previousEmploymentDocument);

            return Ok(id);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(PreviousEmploymentDocument previousEmploymentDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await previousEmploymentDocumentService.UpdateAsync(previousEmploymentDocument);

            return Ok(result);
        }
    }
}