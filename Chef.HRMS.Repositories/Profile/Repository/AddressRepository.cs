namespace Chef.HRMS.Repositories;

public class AddressRepository : GenericRepository<Address>, IAddressRepository
{
    public AddressRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<Address>> GetAllByEmployeeId(int employeeId)
    {
        var sql = "SELECT * FROM  hrms.address WHERE employeeId = @employeeId AND isarchived = false";

        return await Connection.QueryAsync<Address>(sql, new { employeeId });
    }
}
