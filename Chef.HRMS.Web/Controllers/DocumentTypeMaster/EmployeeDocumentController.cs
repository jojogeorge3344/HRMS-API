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
    public class EmployeeDocumentController : ControllerBase
    {
        private readonly IEmployeeDocumentService documentTypeService;

        public EmployeeDocumentController(IEmployeeDocumentService documentTypeService)
        {
            this.documentTypeService = documentTypeService;
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(EmployeeDocument employeeDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var documentDetails = await documentTypeService.InsertAsync(employeeDocument);

            return CreatedAtAction(nameof(Insert), documentDetails);
        }
        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(EmployeeDocument employeeDocument)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await documentTypeService.UpdateAsync(employeeDocument);

            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<EmployeeDocument>>> GetAll()
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
        [HttpGet("GetEmployeeId/{id}")]
        public async Task<ActionResult<IEnumerable<EmployeeDocument>>> GetEmployeeId(int id)
        {
            var employee = await documentTypeService.GetEmployeeId(id);

            if (employee == null)
            {
                return NotFound();
            }

            return Ok(employee);
        }
        [HttpGet("GetAllByEmployeeId/{id}/{documentid}")]
        public async Task<ActionResult<EmployeeDocumentAttachment>> GetAllByEmployeeId(int id, int documentid)
        {
            var employeeDetails = await documentTypeService.GetAllByEmployeeId(id, documentid);

            if (employeeDetails == null)
            {
                return NotFound();
            }

            return Ok(employeeDetails);
        }
        [HttpGet("IsDocumentCodeExist/{documentnumber}")]
        public async Task<bool> IsDocumentCodeExist(string documentnumber)
        {
            return await documentTypeService.IsDocumentCodeExist(documentnumber);
        }
    }
}
