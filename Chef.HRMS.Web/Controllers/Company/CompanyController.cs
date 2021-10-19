using Chef.Common.Types;
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
    [Route("api/settings/[controller]")]
    public class CompanyController : ControllerBase
    {
        private readonly ICompanyService companyService;

        public CompanyController(ICompanyService companyService)
        {
            this.companyService = companyService;
        }

        [HttpGet("Get")]
        public async Task<ActionResult<HRMSCompany>> Get()
        {
            var company = await companyService.GetAsync();

            if (company == null)
            {
                return NotFound();
            }

            return Ok(company);
        }

        [HttpGet("GetBusinessType")]
        public async Task<ActionResult<IEnumerable<BusinessType>>> GetBusinessType()
        {
            var typeofBusiness = await companyService.GetBusinessTypeAsync();

            return Ok(typeofBusiness);
        }

        [HttpPost("Update")]
        [Consumes(MediaTypeNames.Application.Json)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<int>> Update(HRMSCompany company)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await companyService.UpdateAsync(company);

            return Ok(result);
        }
    }
}