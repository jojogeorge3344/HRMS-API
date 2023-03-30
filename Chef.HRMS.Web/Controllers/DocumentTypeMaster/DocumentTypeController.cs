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
    public class DocumentTypeController : ControllerBase
    {
        private readonly IDocumentTypeService documentTypeService;

        public DocumentTypeController(IDocumentTypeService documentTypeService)
        {
            this.documentTypeService = documentTypeService;
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> Insert(HRMS.Models.DocumentDetail documentType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var documentDetails = await documentTypeService.InsertAsync(documentType);

            return CreatedAtAction(nameof(Insert), documentDetails);
        }
        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(HRMS.Models.DocumentDetail documentType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await documentTypeService.UpdateAsync(documentType);

            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<HRMS.Models.DocumentDetail>>> GetAll()
        {
            var documentList = await documentTypeService.GetAllAsync();

            return Ok(documentList);
        }
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var documentdelete = await documentTypeService.GetAsync(id);

            if (documentdelete == null)
            {
                return NotFound();
            }

            var result = await documentTypeService.DeleteAsync(id);

            return Ok(result);
        }
    }
}
