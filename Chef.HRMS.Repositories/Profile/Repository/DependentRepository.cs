namespace Chef.HRMS.Repositories;

public class DependentRepository : GenericRepository<Dependent>, IDependentRepository
{
    public DependentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<Dependent>> GetAllByEmployeeId(int employeeId)
    {
        var sql = @"SELECT * FROM  hrms.dependent WHERE  employeeId = @employeeId  and isarchived = false order by id desc";

        return await Connection.QueryAsync<Dependent>(sql, new { employeeId });
    }
}