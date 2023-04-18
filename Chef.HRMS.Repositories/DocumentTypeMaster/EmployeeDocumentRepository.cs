using Chef.Common.Core.Extensions;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeDocumentRepository : TenantRepository<EmployeeDocument>, IEmployeeDocumentRepository
    {
        public EmployeeDocumentRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {

        }

        public async Task<IEnumerable<DocumentDetail>> GetAllActiveDocumentsTypes()
        {
            return await QueryFactory
            .Query<DocumentDetail>()
            .Where("status", true)
            .WhereNotArchived()
            .GetAsync<DocumentDetail>();
        }

        public async Task<IEnumerable<EmployeeDocumentAttachment>> GetAllByEmployeeId(int employeeId, int documentid)
        {
            var sql = @"SELECT ed.*,
                                   d.extension        AS extension, 
                                   d.NAME             AS filename, 
                                   d.path             AS path 
                            FROM   hrms.employeedocument ed                               
                                   INNER JOIN hrms.document d 
                                   ON ed.documentid = d.id 
								   where ed.employeeid=@employeeId
                                   and d.id=@documentid
								   and ed.isarchived=false ";   // Added "where e.isarchived=false" for By Nir

            return await Connection.QueryAsync<EmployeeDocumentAttachment>(sql, new { employeeId, documentid });
        }

        public async Task<IEnumerable<EmployeeDocument>> GetEmployeeId(int id)
        {
            return await QueryFactory
            .Query<EmployeeDocument>()
            .Where("employeeid", id)
            .WhereNotArchived()
            .GetAsync<EmployeeDocument>();
        }

        public async Task<bool> IsDocumentCodeExist(string documentnumber)
        {
            if (await QueryFactory
           .Query<EmployeeDocument>()
           .Where("documentnumber", documentnumber)
           .WhereNotArchived()
           .CountAsync<int>() > 0) return true;
            else return false;
        }
    }
}
