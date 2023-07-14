namespace Chef.HRMS.Repositories;

public interface ITenantRepository : IGenericRepository<HRMSTenant>
{
    public HRMSTenant Get();

    public void CreateDatabase();

    public void CreateSchemas();
}
