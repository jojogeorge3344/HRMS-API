using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeBasicComponentBreakupRepository : GenericRepository<EmployeeBasicComponentBreakupView>, IEmployeeBasicComponentBreakupRepository
    {
        public EmployeeBasicComponentBreakupRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<EmployeeBasicComponentBreakupView>> GetAllEmployeeBasicComponentBreakupView(int month, int year)
        {
            using (Connection)
            {
                var sql = @$"SELECT      employeename, 
                                         employeecode, 
                                         json_object_agg(shortcode,total order BY shortcode) basiccomponents, 
                                         COALESCE(bonus,0)                                   bonus, 
                                         effectivedate 
                                FROM     ( 
                                                    SELECT     employeename, 
                                                               employeecode, 
                                                               shortcode, 
                                                               sum(monthlyamount) AS total, 
                                                               sum(eb.amount)        bonus, 
                                                               es.effectivedate 
                                                    FROM       payrollbasiccomponent pb 
                                                    INNER JOIN employeesalaryconfiguration es 
                                                    ON         pb.employeeid=es.employeeid 
                                                    LEFT JOIN  employeebonus eb 
                                                    ON         eb.employeeid = pb.employeeid 
                                                    AND        ( 
                                                                          extract(month FROM eb.disburseon) = @month 
                                                               AND        ( 
                                                                                     extract(year FROM eb.disburseon) = @year)) 
                                                    INNER JOIN payrollprocessingmethod pp 
                                                    ON         pb.payrollprocessingmethodid=pp.id 
                                                    WHERE      pp.month=@month 
                                                    AND        pp.year=@year
                                                    GROUP BY   employeename, 
                                                               employeecode, 
                                                               shortcode, 
                                                               es.effectivedate 
                                                    ORDER BY   1 ) s 
                                GROUP BY employeename, 
                                         employeecode, 
                                         s.bonus, 
                                         effectivedate 
                                ORDER BY employeename;";

                return await Connection.QueryAsync<EmployeeBasicComponentBreakupView>(sql, new { month, year });
            }
        }
    }
}
