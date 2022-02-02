using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class JobTitleRepository : GenericRepository<JobTitle>, IJobTitleRepository
    {
        public JobTitleRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
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
                                          ON jt.id = jd.jobtitleid order by jt.id desc ";

                return await Connection.QueryAsync<JobTitleView>(sql);
        }
    }
}