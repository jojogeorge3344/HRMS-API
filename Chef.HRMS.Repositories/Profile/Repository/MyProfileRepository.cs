﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class MyProfileRepository : GenericRepository<MyProfileView>, IMyProfileRepository
    {
        public MyProfileRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<MyProfileView> GetMyProfileDetailsAsync(int employeeId)
        {
            using (Connection)
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
                            FROM   employee AS e 
                                   LEFT JOIN jobdetails AS jb 
                                          ON e.id = jb.employeeid 
                                   LEFT JOIN jobfiling AS jf 
                                          ON e.id = jf.employeeid
                                    where e.id=@employeeId";

                return await Connection.QueryFirstOrDefaultAsync<MyProfileView>(sql, new { employeeId });
            }
        }
    }
}
