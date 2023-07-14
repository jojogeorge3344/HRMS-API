namespace Chef.HRMS.Repositories;

public class ContactRepository : GenericRepository<Contact>, IContactRepository
{
    public ContactRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<Contact>> GetAllByEmployeeId(int employeeId)
    {
        var sql = "SELECT * FROM  hrms.contact WHERE employeeId = @employeeId";

        return await Connection.QueryAsync<Contact>(sql, new { employeeId });
    }
}