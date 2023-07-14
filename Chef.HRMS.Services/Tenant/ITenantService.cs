using Chef.HRMS.Models;

namespace Chef.HRMS.Services;

public interface ITenantService : IAsyncService<HRMSTenant>
{
    public void CreateDatabase();

    public void CreateSchemas();

    public HRMSTenant Get();
}