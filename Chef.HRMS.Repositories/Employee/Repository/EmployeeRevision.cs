using Chef.Common.Core.Extensions;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks; 

namespace Chef.HRMS.Repositories
{
    public class EmployeeRevisionRepository : GenericRepository<EmployeeRevision>, IEmployeeRevisionRepository
    {
        public EmployeeRevisionRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<EmployeeRevisionView> GetEmployeeDetail(int employeeId)
        {
            var sql = @"SELECT jf.employeeid,jf.leavestructureid,jf.shiftid,jf.weekoff,
                        ls.name AS leavestructurename,s.name AS shiftname,hc.id AS holidaycategoryid,hc.name AS holidaycategoryname,
                        jf.eosid,jf.bfcode,jf.bfname,jt.id AS designationid,jt.name AS designationname,jd.department,jd.timetype,
                        jd.workertype,jf.attendancetracking,jf.payrollstructureid,ps.name AS payrollstructurename,
                        jf.paygroupid,pg.name AS paygroupname,jf.overtimepolicyid,otp.name AS overtimepolicyname
                        FROM hrms.jobfiling jf
                        INNER JOIN hrms.leavestructure ls 
                        ON ls.id = jf.leavestructureid
                        INNER JOIN hrms.shift s 
                        ON jf.shiftid = s.id
                        INNER JOIN hrms.holidaycategory hc 
                        ON hc.id = jf.holidaycategoryid
                        INNER JOIN hrms.jobdetails jd 
                        ON jd.employeeid = jf.employeeid
                        INNER JOIN hrms.jobtitle jt 
                        ON jt.id = jd.jobtitleid
                        INNER JOIN hrms.payrollstructure ps 
                        ON ps.id = jf.payrollstructureid
                        INNER JOIN hrms.paygroup pg 
                        ON pg.id = jf.paygroupid
                        INNER JOIN hrms.overtimepolicy otp 
                        ON otp.id = jf.overtimepolicyid
                        WHERE jf.employeeid = @employeeId 
                        AND jf.isarchived = false";

            return await Connection.QueryFirstOrDefaultAsync<EmployeeRevisionView>(sql, new { employeeId });
        }
    }
}