using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeReportRepository : GenericRepository<EmployeeDetailView>, IEmployeeReportRepository
    {
        public EmployeeReportRepository(IHttpContextAccessor httpContextAccessor, DbSession session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<EmployeeDetailView>> GetAllEmployeeDetailView(int offSet)
        {
            using (Connection)
            {
                var sql = @$"SELECT  e.id, 
                                   Concat (e.firstname, ' ', e.lastname) AS employeename, 
								    e.dateofbirth,
									jd.dateofjoin,
									AGE(jd.dateofjoin::date, CURRENT_DATE::date)::text        AS companyexperience,
                                    jd.department, 
									e.gender,
									jd.timetype,
									jd.workertype,
									jf.weekoff,
                                    jd.employeenumber                 AS employeenumber,
									ls.name                           AS leavestructure,
									s.name                            AS shift,
									hc.name                           AS holidaycategory,
									ep.name                           AS expensepolicy,
									ps.name                           AS payrollstructure,
									ot.name                           AS overtimepolicy,
									pg.name                           AS paygroup,
									jt.name                           AS jobtitle
                            FROM hrms.employee AS e 
                            INNER JOIN hrms.jobdetails AS jd 
                                    ON e.id = jd.employeeid
                            INNER JOIN hrms.jobfiling AS jf 
                                    ON e.id = jf.employeeid
							LEFT JOIN hrms.leavestructure AS ls 
                                    ON ls.id = jf.leavestructureid
							LEFT JOIN hrms.shift AS s 
                                    ON s.id = jf.shiftid
							LEFT JOIN hrms.holidaycategory AS hc 
                                    ON hc.id = jf.holidaycategoryid	
							LEFT JOIN hrms.expensepolicy AS ep 
                                    ON ep.id = jf.expensepolicyid
							LEFT JOIN hrms.payrollstructure AS ps 
                                    ON ps.id = jf.payrollstructureid
							LEFT JOIN hrms.overtimepolicy AS ot 
                                    ON ot.id = jf.overtimepolicyid
							LEFT JOIN hrms.paygroup AS pg 
                                    ON pg.id = jf.paygroupid
							LEFT JOIN hrms.jobtitle AS jt 
                                    ON jt.id = jd.jobtitleid		
                            ORDER BY e.id
							OFFSET {offSet} LIMIT 10";

                return await Connection.QueryAsync<EmployeeDetailView>(sql);
            }
        }
    }
}
