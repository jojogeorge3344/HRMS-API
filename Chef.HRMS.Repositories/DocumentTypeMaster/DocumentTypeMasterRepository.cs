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

        public async Task<IEnumerable<DocumentTypeMasterView>> GetAllByEmployeeId(int employeeId,int documentid)
        {
            var sql = @"SELECT e.*,
                                   d.extension        AS extension, 
                                   d.NAME             AS filename, 
                                   d.path             AS path 
                            FROM   hrms.documenttypemaster e                               
                                   INNER JOIN hrms.document d 
                                   ON e.documentid = d.id 
								   where e.employeeid=@employeeId
                                   and d.id=@documentid
								   and e.isarchived=false ";   // Added "where e.isarchived=false" for By Nir

            return await Connection.QueryAsync<DocumentTypeMasterView>(sql, new { employeeId, documentid });
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
