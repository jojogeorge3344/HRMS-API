using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class WorkFromHomeRepository : GenericRepository<WorkFromHome>, IWorkFromHomeRepository
    {
        public WorkFromHomeRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<WorkFromHome>> GetAllWorkFromHomeById(int employeeId)
        {

                var sql = "SELECT * FROM  hrms.workfromhome WHERE employeeid = @Id";

                return await Connection.QueryAsync<WorkFromHome>(sql, new { Id = employeeId });
        }

        public async Task<WorkFromHomeView> GetTotalRequestedDaysById(int employeeId)
        {

                var sql = @"SELECT periodtype, 
                                   maximumlimit, 
                                   Coalesce(totalrequest, 0) AS totalRequest 
                            FROM   hrms.workfromhomesettings 
                                   left join (WITH cte (periodtype) 
                                                   AS (SELECT CASE periodtype  
                                                                WHEN 1 THEN 'week'
                                                                WHEN 3 THEN 'month' 
                                                                WHEN 4 THEN 'year' 
                                                              END, 
                                                              maximumlimit 
                                                       FROM   hrms.workfromhomesettings) 
                                              SELECT SUM(numberofdays) AS totalRequest 
                                               FROM   cte, 
                                                      hrms.workfromhome 
                                               WHERE  Date_part(periodtype, fromdate) = 
                                                      Date_part(periodtype, current_date) 
                                                      AND employeeid = @employeeId 
                                               GROUP  BY periodtype)Q1 
                                          ON 1 = 1 ";

                return await Connection.QueryFirstAsync<WorkFromHomeView>(sql, new { employeeId });
        }

        public async Task<int> InsertNotifyPersonnel(IEnumerable<WorkFromHomeNotifyPersonnel> workFromHomeNotifyPersonnel)
        {

                var sql = new QueryBuilder<WorkFromHomeNotifyPersonnel>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");

                return await Connection.ExecuteAsync(sql, workFromHomeNotifyPersonnel);

        }
    }
}
