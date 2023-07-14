namespace Chef.HRMS.Repositories;

public class JobTitleRepository : GenericRepository<JobTitle>, IJobTitleRepository
{
    public JobTitleRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<JobTitle>> GetAllAsync()
    {
        var sql = @"SELECT * FROM hrms.jobtitle WHERE isarchived = false ORDER BY name ASC";

        return await Connection.QueryAsync<JobTitle>(sql);
    }

    public async Task<IEnumerable<JobTitleView>> GetAllJobTitleList()
    {

        var sql = @"SELECT DISTINCT jt.id, 
                                            jt.name, 
                                            jt.description, 
                                            (SELECT Count(*) 
                                             FROM   hrms.jobdetails 
                                             WHERE  jobtitleid = jd.jobtitleid) AS NumberOfEmployees, 
                                            jt.createddate, 
                                            jt.modifieddate, 
                                            jt.createdby, 
                                            jt.modifiedby,
                                            jt.isarchived
                            FROM   hrms.jobtitle AS jt 
                                   LEFT JOIN hrms.jobdetails AS jd 
                                          ON jt.id = jd.jobtitleid WHERE jt.isarchived=false order by jt.id desc ";   // Added WHERE jt.isarchived=false by Nir";

        return await Connection.QueryAsync<JobTitleView>(sql);
    }
}