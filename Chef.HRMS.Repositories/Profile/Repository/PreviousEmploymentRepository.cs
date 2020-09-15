using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PreviousEmploymentRepository : GenericRepository<PreviousEmployment>, IPreviousEmploymentRepository
    {
        public PreviousEmploymentRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<PreviousEmploymentView>> GetByEmployeeId(int employeeId)
        {
            using (Connection)
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
                            FROM   previousemployment p 
                                   INNER JOIN previousemploymentdocument pd 
                                           ON p.id = pd.previousemploymentid AND p.employeeid = @employeeId
                                   INNER JOIN document d 
                                           ON pd.documentid = d.id ";

                return await Connection.QueryAsync<PreviousEmploymentView>(sql, new { employeeId });
            }
        }
    }
}