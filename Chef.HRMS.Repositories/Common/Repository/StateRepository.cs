namespace Chef.HRMS.Repositories;

public class StateRepository : ConsoleRepository<State>, IStateRepository
{
    public StateRepository(IHttpContextAccessor httpContextAccessor, IConsoleConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<State>> GetAllByCountry(int countryId)
    {

        var sql = "SELECT * FROM  common.state WHERE countryid = @countryId";
        return await Connection.QueryAsync<State>(sql, new { countryId });

    }
}