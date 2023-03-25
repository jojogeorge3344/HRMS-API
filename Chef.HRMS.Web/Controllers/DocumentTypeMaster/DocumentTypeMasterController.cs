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
    public class DocumentTypeMasterController : ControllerBase
    {
        private readonly IDocumentTypeMasterService documentTypeMasterService;

        public DocumentTypeMasterController(IDocumentTypeMasterService documentTypeMasterService)
        {
            this.documentTypeMasterService = documentTypeMasterService;
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(DocumentTypeMaster documentTypeMaster)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var documentDetails = await documentTypeMasterService.InsertAsync(documentTypeMaster);

            return CreatedAtAction(nameof(Insert), documentDetails);
        }
        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(DocumentTypeMaster documentTypeMaster)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await documentTypeMasterService.UpdateAsync(documentTypeMaster);

            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<DocumentTypeMaster>>> GetAll()
        {
            var documentList = await documentTypeMasterService.GetAllAsync();

            return Ok(documentList);
        }
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var documentdelete = await documentTypeMasterService.GetAsync(id);

            if (documentdelete == null)
            {
                return NotFound();
            }

            var result = await documentTypeMasterService.DeleteAsync(id);

            return Ok(result);
        }
        [HttpGet("GetEmployeeId/{id}")]
        public async Task<ActionResult<IEnumerable<DocumentTypeMaster>>> GetEmployeeId(int id)
        {
            var employee = await documentTypeMasterService.GetEmployeeId(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }
    }
}
