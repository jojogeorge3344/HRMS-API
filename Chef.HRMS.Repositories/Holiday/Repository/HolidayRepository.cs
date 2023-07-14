namespace Chef.HRMS.Repositories;

public class HolidayRepository : GenericRepository<Holiday>, IHolidayRepository
{
    public HolidayRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    //public async Task<IEnumerable<Holiday>> GetAll()
    //{
    //    var sql = "SELECT * FROM  hrms.holiday ";

    //    return await Connection.QueryAsync<Holiday>(sql);
    //}

    public async Task<IEnumerable<Holiday>> GetAllByCategory(int categoryId)
    {
        var sql = @"SELECT * FROM  hrms.holiday WHERE holidaycategoryid = @categoryId AND isarchived = false  ORDER BY description ASC";  // Added "and  isarchived = false" by Nir

        return await Connection.QueryAsync<Holiday>(sql, new { categoryId });
    }

    public async Task<IEnumerable<DateTime>> GetAllHolidaysByEmployee(int employeeId)
    {
        var sql = @"SELECT date::date 
                            FROM hrms.holiday h
                                 INNER JOIN hrms.jobfiling jf
                                         ON h.holidaycategoryid = jf.holidaycategoryid
                                              AND jf.employeeid = @employeeid
                            WHERE Date_part('year', date) = Date_part('year', CURRENT_TIMESTAMP) ";

        return await Connection.QueryAsync<DateTime>(sql, new { employeeId });
    }
}