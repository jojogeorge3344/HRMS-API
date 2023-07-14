namespace Chef.HRMS.Repositories;

public class EmployeeNumberSeriesRepository : GenericRepository<EmployeeNumberSeries>, IEmployeeNumberSeriesRepository
{
    public EmployeeNumberSeriesRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<EmployeeNumberSeries>> GetAllActiveNumberSeries()
    {

        string sql = @"SELECT * FROM hrms.employeenumberseries 
                                        WHERE isarchived=false order by id desc";

        return await Connection.QueryAsync<EmployeeNumberSeries>(sql);

    }

    public async Task<IEnumerable<int>> GetAllAssignedNumberSeries()
    {

        string sql = @"SELECT DISTINCT numberseriesid FROM hrms.jobdetails";

        return await Connection.QueryAsync<int>(sql);

    }
}