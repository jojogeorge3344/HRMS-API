namespace Chef.HRMS.Repositories;

public class HolidayCategoryRepository : GenericRepository<HolidayCategory>, IHolidayCategoryRepository
{
    public HolidayCategoryRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<int>> GetAllAssignedHolidayCategory()
    {
        var sql = @"SELECT DISTINCT holidaycategoryid 
                                    FROM hrms.jobfiling
                                    ORDER  BY holidaycategoryid ASC";

        return await Connection.QueryAsync<int>(sql);
    }

    public async Task<bool> UpdateHolidayCategory(int id, bool isConfigured)
    {
        var sql = @"UPDATE hrms.holidaycategory
                                   SET isconfigured=@isConfigured
                                    WHERE id=@id";

        var result = await Connection.ExecuteAsync(sql, new { id, isConfigured });
        if (result == 1)
        {
            return true;

        }
        else
        {
            return false;
        }
    }
}