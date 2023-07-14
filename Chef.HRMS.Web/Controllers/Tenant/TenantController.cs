using Chef.HRMS.Models;
using Chef.HRMS.Services;
using Microsoft.AspNetCore.Mvc;

namespace Chef.HRMS.Web.Controllers;

[ApiController]
[Route("api/admin/[controller]")]
public class TenantController : ControllerBase
{
    private readonly ITenantService tenantService;

    public TenantController(ITenantService tenantService)
    {
        this.tenantService = tenantService;
         
    }

    [HttpGet("CreateDatabase")]
    public ActionResult<HRMSTenant> CreateDatabase()
    {
        tenantService.CreateDatabase();

        return Ok();
    }

    [HttpGet("CreateSchemas")]
    public ActionResult<HRMSTenant> CreateSchemas()
    {
        tenantService.CreateSchemas();

        return Ok();
    }

    [HttpGet("Get/{id}")]
    public ActionResult<HRMSTenant> Get()
    {
        var Tenant = tenantService.Get();

        if (Tenant == null)
        {
            return NotFound();
        }

        return Ok(Tenant);
    }
}