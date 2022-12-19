using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EducationRepository : GenericRepository<Education>, IEducationRepository
    {
        public EducationRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<EducationView>> GetAllByEmployeeId(int employeeId)
        {
                var sql = @"SELECT e.id               AS educationid, 
                                   d.id               AS documentid, 
                                   ed.id              AS educationdocumentid, 
                                   e.employeeid       AS employeeId, 
                                   e.degree           AS degree, 
                                   e.percentage       AS percentage, 
                                   e.specialization   AS specialization, 
                                   e.university       AS university, 
                                   e.yearofcompletion AS yearofcompletion, 
                                   e.yearofjoining    AS yearofjoining, 
                                   e.isapproved       AS isapproved, 
                                   d.extension        AS extension, 
                                   d.NAME             AS filename, 
                                   d.path             AS path 
                            FROM   hrms.education e 
                                   INNER JOIN hrms.educationdocument ed 
                                           ON e.id = ed.educationid AND e.employeeid = @employeeId
                                   INNER JOIN hrms.document d 
                                           ON ed.documentid = d.id order by e.id desc";

                return await Connection.QueryAsync<EducationView>(sql, new { employeeId });
        }
    }
}