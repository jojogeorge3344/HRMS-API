﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EducationRepository : GenericRepository<Education>, IEducationRepository
    {
        public EducationRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<EducationView>> GetAllByEmployeeId(int employeeId)
        {
            using (Connection)
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
                            FROM   education e 
                                   INNER JOIN educationdocument ed 
                                           ON e.id = ed.educationid AND e.employeeid = @employeeId
                                   INNER JOIN document d 
                                           ON ed.documentid = d.id";

                return await Connection.QueryAsync<EducationView>(sql, new { employeeId });
            }
        }
    }
}