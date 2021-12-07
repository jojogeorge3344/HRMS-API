using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class MyProfileRepository : GenericRepository<MyProfileView>, IMyProfileRepository
    {
        public MyProfileRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<MyProfileView> GetMyProfileDetailsAsync(int employeeId)
        {
                var sql = @"SELECT e.id, 
                                   e.firstname, 
                                   e.middlename, 
                                   e.lastname, 
                                   e.email, 
                                   e.gender, 
                                   jb.id AS jobdetailsid, 
                                   jb.department, 
                                   jb.location, 
                                   jf.id AS jobfilingid, 
                                   jb.jobtitleid, 
                                   jb.reportingmanager, 
                                   jb.employeenumber, 
                                   jb.dateofjoin, 
                                   jb.noticeperiod 
                            FROM   hrms.employee AS e 
                                   LEFT JOIN hrms.jobdetails AS jb 
                                          ON e.id = jb.employeeid 
                                   LEFT JOIN hrms.jobfiling AS jf 
                                          ON e.id = jf.employeeid
                                    where e.id=@employeeId";

                return await Connection.QueryFirstOrDefaultAsync<MyProfileView>(sql, new { employeeId });
        }
    }
}
