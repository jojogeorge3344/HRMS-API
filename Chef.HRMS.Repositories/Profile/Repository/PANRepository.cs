﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PANRepository : GenericRepository<PAN>, IPANRepository
    {
        public PANRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<PANView>> GetByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT p.id          AS panid, 
                                   d.id          AS documentid, 
                                   pd.id         AS pandocumentid, 
                                   p.dateofbirth AS dateofbirth, 
                                   p.fathername  AS fathername, 
                                   p.NAME        AS NAME, 
                                   p.number      AS number, 
                                   p.employeeid  AS employeeid, 
                                   p.isapproved  AS isapproved, 
                                   d.extension   AS extension, 
                                   d.NAME        AS filename, 
                                   d.path        AS path 
                            FROM   hrms.pan p 
                                   INNER JOIN hrms.pandocument pd 
                                           ON p.id = pd.panid AND p.employeeid = @employeeId
                                   INNER JOIN hrms.document d 
                                           ON pd.documentid = d.id ";

                return await Connection.QueryAsync<PANView>(sql, new { employeeId });
            }
        }
    }
}