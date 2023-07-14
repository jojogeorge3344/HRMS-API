namespace Chef.HRMS.Repositories;

public class PreviousEmploymentRepository : GenericRepository<PreviousEmployment>, IPreviousEmploymentRepository
{
    public PreviousEmploymentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<PreviousEmploymentView>> GetByEmployeeId(int employeeId)
    {
        var sql = @"SELECT p.id              AS previousemploymentid, 
                                   d.id              AS documentid, 
                                   pd.id             AS previousemploymentdocumentid, 
                                   p.companyname     AS companyname, 
                                   p.dateofjoining   AS dateofjoining, 
                                   p.dateofrelieving AS dateofrelieving, 
                                   p.jobtitle        AS jobtitle, 
                                   p.location        AS location, 
                                   p.isapproved      AS isapproved, 
                                   p.employeeid      AS employeeId, 
                                   d.extension       AS extension, 
                                   d.NAME            AS filename, 
                                   d.path            AS path 
                            FROM   hrms.previousemployment p 
                                   INNER JOIN hrms.previousemploymentdocument pd 
                                           ON p.id = pd.previousemploymentid AND p.employeeid = @employeeId
                                   INNER JOIN hrms.document d 
                                           ON pd.documentid = d.id  where p.isarchived =false  order by p.id desc ";  //Added for where p.isarchived =false by Nir

        return await Connection.QueryAsync<PreviousEmploymentView>(sql, new { employeeId });
    }
}