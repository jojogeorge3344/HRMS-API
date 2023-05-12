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
        public SystemVariableValuesRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<SystemVariableDto>> GetAllSystemVariableDetails(int PayGroupId, SystemVariableValues systemVariableValues)
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
            List<SystemVariableValues> systemVariableValues1 = new List<SystemVariableValues>();
            foreach (var v in Lop_Dys_Btw_Dte)
            {
                var mm = Mapper.Map<SystemVariableValues>(v);
                mm.SystemVariableId = v.SystemVariableId;
                mm.TransValue = v.TransValue;
                mm.EmployeeId = v.EmployeeId;
                systemVariableValues1.Add(mm);
            }
            var sql2 = new QueryBuilder<SystemVariableValues>().GenerateInsertQuery();
            var result = await Connection.QueryFirstOrDefaultAsync<string>(sql2, systemVariableValues1);

            return Lop_Dys_Btw_Dte.ToList();
        }
    }
}
