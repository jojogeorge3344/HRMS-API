using Chef.HRMS.Models;
using Chef.HRMS.Repositories;

namespace Chef.HRMS.Services;

public class TenantService : AsyncService<HRMSTenant>, ITenantService
{
    private readonly ITenantRepository tenantRepository;

    public TenantService(ITenantRepository tenantRepository)
    {
        this.tenantRepository = tenantRepository;
    }

    public void CreateDatabase()
    {
        this.tenantRepository.CreateDatabase();
    }

    public void CreateSchemas()
    {
        this.tenantRepository.CreateSchemas();
    }
 

    public HRMSTenant Get()
    {
        return this.tenantRepository.Get();
    }

}