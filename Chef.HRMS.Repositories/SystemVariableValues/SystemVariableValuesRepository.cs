using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class SystemVariableValuesRepository : GenericRepository<SystemVariableValues>, ISystemVariableValuesRepository
    {
        private readonly IBulkUploadRepository bulkUploadRepository;

        public SystemVariableValuesRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session, IBulkUploadRepository bulkUploadRepository) : base(httpContextAccessor, session)
        {
            this.bulkUploadRepository = bulkUploadRepository;
        }

        public async Task<string> InsertSystemVariableDetails(int PayGroupId)//, PayrollProcessingMethod systemVariableValues)
        {
            var sql = @"SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Lop_Dys_Btw_Dte' AND isarchived=false LIMIT 1)
						AS systemvariableid , ld.employeeid AS employeeid,
						COUNT(ld.leavedate) AS transvalue
						FROM hrms.leave l
						LEFT JOIN hrms.leavecomponent lc ON l.leavecomponentid=lc.id
						LEFT JOIN hrms.leavedetails ld ON l.id = ld.leaveid
						WHERE  lc.isunpaidleave=true AND l.isarchived=false AND lc.isarchived=false AND l.employeeid 
						IN
						(
							SELECT hm.id FROM hrms.hrmsemployee hm
							LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
							LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
							WHERE pg.id=@PayGroupId AND hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
						)
						GROUP BY ld.employeeid;";

            var Lop_Dys_Btw_Dte = await Connection.QueryAsync<SystemVariableDto>(sql, new { PayGroupId });
            List<SystemVariableValues> systemVariableValues = Lop_Dys_Btw_Dte.Select(x => new SystemVariableValues()
            {
                SystemVariableId = x.SystemVariableId,
                TransValue = x.TransValue,
                EmployeeId = x.EmployeeId
            }).ToList();
            var dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues);
            return dd.ToString();
        }
    }
}
