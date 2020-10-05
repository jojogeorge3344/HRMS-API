﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class DrivingLicenseRepository : GenericRepository<DrivingLicense>, IDrivingLicenseRepository
    {
        public DrivingLicenseRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<DrivingLicenseView>> GetByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT a.id           AS drivinglicenseid, 
                                   c.id           AS documentid, 
                                   b.id           AS drivinglicensedocumentid, 
                                   a.address      AS address, 
                                   a.dateofexpiry AS dateofexpiry, 
                                   a.dateofbirth  AS dateofbirth, 
                                   a.NAME         AS NAME, 
                                   a.fathername   AS fathername, 
                                   a.number       AS number, 
                                   a.employeeid   AS employeeId, 
                                   a.isapproved   AS isapproved, 
                                   c.extension    AS extension, 
                                   c.NAME         AS filename, 
                                   c.path         AS path 
                            FROM   drivinglicense A 
                                   INNER JOIN drivinglicensedocument B 
                                           ON a.id = b.drivinglicenseid 
                                              AND a.employeeid = @employeeId 
                                   INNER JOIN document C 
                                           ON b.documentid = c.id";

                return await Connection.QueryAsync<DrivingLicenseView>(sql, new { employeeId });
            }
        }
    }
}