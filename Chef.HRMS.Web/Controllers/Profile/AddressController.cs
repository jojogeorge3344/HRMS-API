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
    public class AddressController : ControllerBase
    {
        private readonly IAddressService addressService;

        public AddressController(IAddressService addressService)
        {
            this.addressService = addressService;
        }

        [HttpPost("Insert")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[Route("Insert")]
        public async Task<IActionResult> Insert(Address address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            address = await addressService.InsertAsync(address);

            return CreatedAtAction(nameof(Insert), address);
        }

        [HttpGet("GetAllByEmployeeId/{id}")]
        public async Task<ActionResult<Address>> GetAllByEmployeeId(int id)
        {
            var address = await addressService.GetAllByEmployeeId(id);


            if (address == null)
            {
                return NotFound();
            }

            return Ok(address);
        }
        [HttpGet("Get/{id}")]
        public async Task<ActionResult<Education>> Get(int id)
        {
            var address = await addressService.GetAsync(id);

            if (address == null)
            {
                return NotFound();
            }

            return Ok(address);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(Address address)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await addressService.UpdateAsync(address);
            
            return Ok(result);
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<IEnumerable<Address>>> GetAll()
        {
            var addressList = await addressService.GetAllAsync();

            return Ok(addressList);
        }

        [HttpDelete("Delete/{id}")]
        public async Task<ActionResult<int>> Delete(int id)
        {
            var result = await addressService.DeleteAsync(id);

            return Ok(result);
        }
    }
}