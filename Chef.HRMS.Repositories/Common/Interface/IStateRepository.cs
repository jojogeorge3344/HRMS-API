namespace Chef.HRMS.Repositories;

public interface IStateRepository : IGenericRepository<State>
{
    Task<IEnumerable<State>> GetAllByCountry(int countryId);
}