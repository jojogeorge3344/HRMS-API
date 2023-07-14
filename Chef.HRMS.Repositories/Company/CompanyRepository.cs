namespace Chef.HRMS.Repositories;

public class CompanyRepository : GenericRepository<HRMSCompany>, ICompanyRepository
{
    public CompanyRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<HRMSCompany> GetAsync()
    {

        var query = "SELECT * FROM hrms.hrmscompany";
        return await Connection.QueryFirstOrDefaultAsync<HRMSCompany>(query);

    }
}