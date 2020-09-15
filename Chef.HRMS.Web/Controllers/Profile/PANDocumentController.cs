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
    [Route("api/profile/[controller]")]
    public class PANDocumentController : ControllerBase
    {
        private readonly IPANDocumentService panDocumentService;

        public PANDocumentController(IPANDocumentService panDocumentService)
        {
            this.panDocumentService = panDocumentService;
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var panDocument = await panDocumentService.GetAsync(id);

            if (panDocument == null)
            {
                return NotFound();
            }

            var result = await panDocumentService.DeleteAsync(id);

            return Ok(result);
        }

        [HttpGet("Get/{id}")]
        public async Task<ActionResult<PANDocument>> Get(int id)
        {
            var panDocument = await panDocumentService.GetAsync(id);

            if (panDocument == null)
            {
                return NotFound();
            }

            return Ok(panDocument);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<PANDocument>>> GetAll()
        {
            var panDocuments = await panDocumentService.GetAllAsync();

            return Ok(panDocuments);
        }

        [HttpPost]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Route("Insert")]
        public async Task<IActionResult> Insert(PANDocument panDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            panDocument = await panDocumentService.InsertAsync(panDocument);

            return CreatedAtAction(nameof(Insert), panDocument);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(PANDocument panDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await panDocumentService.UpdateAsync(panDocument);

            return Ok(result);
        }
    }
}