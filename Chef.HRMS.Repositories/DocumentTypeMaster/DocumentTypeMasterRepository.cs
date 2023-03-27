using Chef.Common.Core.Extensions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class DocumentTypeMasterRepository : TenantRepository<Models.DocumentTypeMaster>, IDocumentTypeMasterRepository
    {
        public DocumentTypeMasterRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }

        public async Task<IEnumerable<DocumentTypeMasterView>> GetAllByEmployeeId(int employeeId)
        {
            var sql = @"SELECT e.id               AS documenttypemasterid, 
                                   d.id               AS documentid, 
                                   e.employeeid       AS employeeId,
                                   d.extension        AS extension, 
                                   d.NAME             AS filename, 
                                   d.path             AS path 
                            FROM   hrms.documenttypemaster e                               
                                   INNER JOIN hrms.document d 
                                   ON e.employeeid = d.employeeid 
								   where d.employeeid=@employeeId
								   and e.isarchived=false ";   // Added "where e.isarchived=false" for By Nir

            return await Connection.QueryAsync<DocumentTypeMasterView>(sql, new { employeeId });
        }

        public async Task<IEnumerable<DocumentTypeMaster>> GetEmployeeId(int id)
        {
            return await QueryFactory
           .Query<DocumentTypeMaster>()
           .Where("employeeid", id)
           .WhereNotArchived()
           .GetAsync<DocumentTypeMaster>();
        }
    }
}
