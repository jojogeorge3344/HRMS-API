using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Net.Mime;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers.BankMaster
{
    [Route("api/[controller]")]
    [ApiController]
    public class BankMasterController : ControllerBase
    {
        private readonly IBankMasterService bankMasterService;

        public BankMasterController(IBankMasterService bankMasterService)
        {
            this.bankMasterService = bankMasterService;
        }
        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Insert(HRMSBank hRMSBank)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var bankDetails = await bankMasterService.InsertAsync(hRMSBank);

            return CreatedAtAction(nameof(Insert), bankDetails);
        }
        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(HRMSBank hRMSBank)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await bankMasterService.UpdateAsync(hRMSBank);

            return Ok(result);
        }
        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<HRMSBank>>> GetAll()
        {
            var bankList = await bankMasterService.GetAllAsync();

            return Ok(bankList);
        }
        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var banktdelete = await bankMasterService.GetAsync(id);

            if (banktdelete == null)
            {
                return NotFound();
            }

            var result = await bankMasterService.DeleteAsync(id);

            return Ok(result);
        }
        [HttpGet("IsBankCodeExist/{code}")]
        public async Task<bool> IsBankCodeExist(string code)
        {
            return await bankMasterService.IsBankCodeExist(code);
        }
        [HttpGet("IsBankNameExist/{name}")]
        public async Task<bool> IsBankNameExist(string name)
        {
            return await bankMasterService.IsBankNameExist(name);
        }
    }
}
