namespace Chef.HRMS.Repositories;

public class PayGroupRepository : GenericRepository<PayGroup>, IPayGroupRepository
{
    public PayGroupRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<int>> GetAllAssignedPayGroup()
    {

        var sql = @"SELECT DISTINCT paygroupid 
                                    FROM hrms.jobfiling
                                    ORDER  BY paygroupid ASC";

        return await Connection.QueryAsync<int>(sql);

    }

    public async Task<IEnumerable<EmployeeView>> GetAllEmployeeByPayGroupId(int paygroupId, int year, int month)
    {


        try
        {
            var sql = @"SELECT e.id              AS id, 
                                   jd.employeenumber AS employeenumber, 
                                   Concat (e.firstname, ' ', e.lastname)     AS FirstName 
                            FROM   hrms.HRMSEmployee e 
                                   INNER JOIN hrms.jobdetails jd 
                                           ON e.id = jd.employeeid 
                                   INNER JOIN hrms.jobfiling jf 
                                           ON jd.employeeid = jf.employeeid 
                                              AND jf.paygroupid = @paygroupId
                                               WHERE (e.id NOT IN(Select ppm.employeeid from hrms.payrollprocessingmethod ppm where( ppm.month=@month 
                                                        AND
													     ppm.year=@year)) )";

            return await Connection.QueryAsync<EmployeeView>(sql, new { paygroupId, year, month });
        }
        catch
        {
            return null;
        }


    }
}
