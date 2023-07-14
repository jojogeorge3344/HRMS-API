namespace Chef.HRMS.Repositories;

public interface ICompanyRepository : IGenericRepository<HRMSCompany>
{
    public Task<HRMSCompany> GetAsync();
}