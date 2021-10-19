using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeReportRepository : GenericRepository<EmployeeDetailView>, IEmployeeReportRepository
    {
        public EmployeeReportRepository(DbSession session) : base(session)
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
                            FROM employee AS e 
                            INNER JOIN jobdetails AS jd 
                                    ON e.id = jd.employeeid
                            INNER JOIN jobfiling AS jf 
                                    ON e.id = jf.employeeid
							LEFT JOIN leavestructure AS ls 
                                    ON ls.id = jf.leavestructureid
							LEFT JOIN shift AS s 
                                    ON s.id = jf.shiftid
							LEFT JOIN holidaycategory AS hc 
                                    ON hc.id = jf.holidaycategoryid	
							LEFT JOIN expensepolicy AS ep 
                                    ON ep.id = jf.expensepolicyid
							LEFT JOIN payrollstructure AS ps 
                                    ON ps.id = jf.payrollstructureid
							LEFT JOIN overtimepolicy AS ot 
                                    ON ot.id = jf.overtimepolicyid
							LEFT JOIN paygroup AS pg 
                                    ON pg.id = jf.paygroupid
							LEFT JOIN jobtitle AS jt 
                                    ON jt.id = jd.jobtitleid		
                            ORDER BY e.id
							OFFSET {offSet} LIMIT 10";

                return await Connection.QueryAsync<EmployeeDetailView>(sql);
            }
        }
    }
}
