using Chef.Common.Core.Extensions;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks; 

namespace Chef.HRMS.Repositories
{
    public class EmployeeRepository : GenericRepository<HRMSEmployee>, IEmployeeRepository
    {
        public EmployeeRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<EmployeeView>> GetAllEmployeeDetails()
        {

                var sql = @"SELECT  e.id, 
                                    e.firstname, 
                                    e.middlename, 
                                    e.lastname, 
                                    e.email, 
                                    e.filenumber,
                                    e.uidnumber,
                                    e.languageknown,
                                    jf.paygroupid,
                                    jd.id               AS jobdetailsid, 
                                    jd.department, 
                                    jd.location, 
                                    jd.employeenumber   AS employeenumber,
                                    jf.id               AS jobfilingid,
                                    a.currentaddressline1,
                                    a.currentaddressline2,
                                    a.currentcountry,
                                    a.currentstate,
                                    a.currentpincode,
                                    a.permanentaddressline1,
                                    a.permanentaddressline2,
                                    a.permanentcountry,
                                    a.permanentstate,
                                    a.permanentpincode
                            FROM hrms.HRMSEmployee AS e 
                            LEFT JOIN hrms.jobdetails AS jd 
                                    ON e.id = jd.employeeid
                            LEFT JOIN hrms.jobfiling AS jf 
                                    ON e.id = jf.employeeid
                            LEFT JOIN hrms.address AS a 
                                    ON e.id = a.employeeid
                            WHERE e.isarchived=false
                            ORDER BY e.id desc";

                return await Connection.QueryAsync<EmployeeView>(sql);
        }

        public async Task<EmployeeView> GetEmployeeDetailsById(int employeeId)
        {

                var sql = @"SELECT  e.id, 
                                    e.firstname, 
                                    e.middlename, 
                                    e.lastname, 
                                    e.email, 
                                    e.filenumber,
                                    e.uidnumber,
                                    e.languageknown,
                                    jd.id                             AS jobdetailsid, 
                                    jd.department, 
                                    jd.location, 
                                    jd.employeenumber                 AS employeenumber,
                                    jf.id                             AS jobfilingid,
									jf.leavestructureid               AS leavestructureid,
									jf.shiftid                        AS shiftid,
									jf.holidaycategoryid              AS holidaycategoryid,
									jf.expensepolicyid                AS expensepolicyid,
									jf.payrollstructureid             AS payrollstructureid,
									jf.overtimepolicyid               AS overtimepolicyid
                            FROM hrms.HRMSEmployee AS e 
                            LEFT JOIN hrms.jobdetails AS jd 
                                    ON e.id = jd.employeeid
                            LEFT JOIN hrms.jobfiling AS jf 
                                    ON e.id = jf.employeeid
                            WHERE   e.id=@employeeId
                            ORDER BY e.id";

                return await Connection.QueryFirstOrDefaultAsync<EmployeeView>(sql, new { employeeId });
        }

        public async Task<IEnumerable<EmployeeView>> GetEmployeeDetailsByJobTile(int jobTitleId)
        {

                var sql = @"SELECT Concat (e.firstname, ' ', e.lastname) AS employeename, 
                                   jd.employeenumber                     AS employeenumber 
                            FROM   hrms.HRMSEmployee e 
                                   INNER JOIN hrms.jobdetails jd 
                                           ON e.id = jd.employeeid 
                            WHERE  jd.jobtitleid = @jobtitleid ";

                return await Connection.QueryAsync<EmployeeView>(sql, new { jobTitleId });

        }
        public async Task<IEnumerable<Notification>> GetAllNotificationById(int employeeId)
        {

                var sql = @"(SELECT    j.reportingmanager     AS employeeid,
                                      COUNT(l.id)      AS pendingrequest,
				                      'Leave Request'  AS notificationtype  
				                                       FROM hrms.jobdetails j
                                                       INNER JOIN hrms.leave l
                                                       ON j.employeeid = l.employeeid
                                                       WHERE j.reportingmanager = @employeeId
								                       AND l.leavestatus = 2
								                       GROUP BY l.employeeid,
                                                        j.reportingmanager)
                            UNION

                           (SELECT    j.reportingmanager     AS employeeid,
                                      COUNT(e.id)      AS pendingrequest,
				                      'Expense Request'  AS notificationtype  
				                                       FROM hrms.jobdetails j
                                                       INNER JOIN hrms.expense e
                                                       ON j.employeeid = e.employeeid
                                                       WHERE j.reportingmanager = @employeeId
								                       AND e.requeststatus = 2
								                       GROUP BY e.employeeid,
						                               j.reportingmanager)";

                return await Connection.QueryAsync<Notification>(sql, new { employeeId });

        }
        public async Task<bool> IsNameExist(string name)
        {
            if (await QueryFactory
           .Query<HRMSEmployee>()
           .Where("firstname", name)
           .WhereNotArchived()
           .CountAsync<int>() > 0) return true;
            else return false;
        }

        public async Task<LoginEmployeeView> GetLoginEmployee(int employeeId)
        {
            var sql = @"SELECT em.firstname,em.id,em.email,em.lastname,em.displayname,
                        jd.employeenumber AS employeecode,em.middlename
                        FROM hrms.hrmsemployee em
                        INNER JOIN hrms.jobdetails jd
                        ON em.id = jd.employeeid
                        WHERE em.id = @employeeId
                        AND em.isarchived = false";

            return await Connection.QueryFirstOrDefaultAsync<LoginEmployeeView>(sql, new { employeeId });
        }
    }
}