using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeRepository : GenericRepository<Employee>, IEmployeeRepository
    {
        public EmployeeRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<EmployeeView>> GetAllEmployeeDetails()
        {

                var sql = @"SELECT  e.id, 
                                    e.firstname, 
                                    e.middlename, 
                                    e.lastname, 
                                    e.email, 
                                    jd.id               AS jobdetailsid, 
                                    jd.department, 
                                    jd.location, 
                                    jd.employeenumber   AS employeenumber,
                                    jf.id               AS jobfilingid
                            FROM hrms.employee AS e 
                            LEFT JOIN hrms.jobdetails AS jd 
                                    ON e.id = jd.employeeid
                            LEFT JOIN hrms.jobfiling AS jf 
                                    ON e.id = jf.employeeid
                            ORDER BY e.id";

                return await Connection.QueryAsync<EmployeeView>(sql);
        }

        public async Task<EmployeeView> GetEmployeeDetailsById(int employeeId)
        {

                var sql = @"SELECT  e.id, 
                                    e.firstname, 
                                    e.middlename, 
                                    e.lastname, 
                                    e.email, 
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
                            FROM hrms.employee AS e 
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
                            FROM   hrms.employee e 
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

    }
}