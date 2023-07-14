namespace Chef.HRMS.Repositories;

public interface IEmployeeNumberSeriesRepository : IGenericRepository<EmployeeNumberSeries>
{
    Task<IEnumerable<int>> GetAllAssignedNumberSeries();
    Task<IEnumerable<EmployeeNumberSeries>> GetAllActiveNumberSeries();
}