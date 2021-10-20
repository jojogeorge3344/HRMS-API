using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class UniqueIdentificationDetailRepository : GenericRepository<UniqueIdentificationDetail>, IUniqueIdentificationDetailRepository
    {
        public UniqueIdentificationDetailRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<UniqueIdentificationDetailView>> GetByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = @"SELECT a.id          AS uniqueidentificationdetailid, 
                                   c.id          AS documentid, 
                                   b.id          AS uniqueidentificationdetaildocumentid, 
                                   a.address     AS address, 
                                   a.dateofbirth AS dateofbirth, 
                                   a.NAME        AS NAME, 
                                   a.fathername  AS fathername, 
                                   a.number      AS number, 
                                   a.employeeid  AS employeeId, 
                                   a.isapproved  AS isapproved, 
                                   c.extension   AS extension, 
                                   c.NAME        AS filename, 
                                   c.path        AS path 
                            FROM   hrms.uniqueidentificationdetail A 
                                   INNER JOIN hrms.uniqueidentificationdocument B 
                                           ON a.id = b.uniqueidentificationdetailid AND a.employeeid = @employeeId
                                   INNER JOIN hrms.document C 
                                           ON b.documentid = c.id ";

                return await Connection.QueryAsync<UniqueIdentificationDetailView>(sql, new { employeeId });
            }
        }
    }
}