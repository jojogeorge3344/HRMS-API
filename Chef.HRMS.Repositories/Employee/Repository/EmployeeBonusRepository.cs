using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeBonusRepository : GenericRepository<EmployeeBonus>, IEmployeeBonusRepository
    {
        public EmployeeBonusRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<EmployeeBonus>> GetAllBonusByEmployeeId(int employeeId)
        {

                var sql = "SELECT * FROM  hrms.employeebonus WHERE employeeid = @employeeId AND isarchived = false";

                return await Connection.QueryAsync<EmployeeBonus>(sql, new { employeeId });
        }

        public async Task<IEnumerable<EmployeeBonusView>> GetAllBonusByEmployeeIdAndPayrollProcessingMethodId(int employeeId, int payrollProcessingMethodId)
        {

                var sql = @"SELECT eb.employeeid                     AS employeeid, 
                                   Concat (firstname, ' ', lastname) AS NAME, 
                                   employeenumber                    AS employeecode, 
                                   eb.id                             AS employeebonusid, 
                                   bonustypeid, 
                                   bt.NAME                           AS bonustype, 
                                   amount, 
                                   disburseon, 
                                   remarks 
                            FROM   hrms.HRMSEmployee e 
                                   INNER JOIN hrms.jobdetails jd 
                                           ON e.id = jd.employeeid 
                                   INNER JOIN hrms.employeebonus eb 
                                           ON e.id = eb.employeeid 
                                   INNER JOIN hrms.bonustype bt 
                                           ON eb.bonustypeid = bt.id 
                                              AND eb.employeeid = @employeeId 
                                   left JOIN hrms.payrollprocessingmethod pm 
                                           on e.id=pm.employeeid
                                              AND pm.id = @payrollProcessingMethodId 
                            WHERE  ( eb.payrollprocessingmethodid = @payrollProcessingMethodId 
                                      OR (eb.payrollprocessingmethodid =0 
                                           AND Extract(month FROM disburseon) = pm.month 
                                           AND ( Extract(year FROM disburseon) = pm.year ) ) ) ";

                return await Connection.QueryAsync<EmployeeBonusView>(sql, new { employeeId, payrollProcessingMethodId });

        }

        public async Task<int> DeleteAllBonusByEmployeeId(int employeeId)
        {

                var sql = @"Delete FROM hrms.employeebonus WHERE employeeId = @employeeId";

                return await Connection.ExecuteAsync(sql, employeeId);

        }

        public async Task<IEnumerable<EmployeeBonusView>> GetAllBonusByPayGroupId(int payrollProcessingMethodId)
        {

                var sql = @"SELECT Distinct pm.paygroupid                         AS paygroupid, 
                                   e.id                                  AS employeeid, 
                                   Concat (e.firstname, ' ', e.lastname) AS NAME, 
                                   jd.employeenumber                     AS employeecode, 
                                   eb.bonustypeid                        AS bonustypeid, 
                                   eb.id                                 AS employeebonusid, 
                                   bt.NAME                               AS bonustype, 
                                   eb.amount                             AS amount, 
                                   eb.disburseon                         AS disburseOn, 
                                   eb.remarks                            AS remarks 
                            FROM   hrms.HRMSEmployee e 
                                   INNER JOIN hrms.jobdetails jd 
                                           ON e.id = jd.employeeid 
                                   INNER JOIN hrms.employeebonus eb 
                                           ON e.id = eb.employeeid 
                                   INNER JOIN hrms.bonustype bt 
                                           ON bt.id = eb.bonustypeid 
                                   Left JOIN hrms.payrollprocessingmethod pm 
                                       on e.id=pm.employeeid
                                              AND pm.employeeid =  @payrollProcessingMethodId
                                              
                            WHERE  (( eb.payrollprocessingmethodid = @payrollProcessingMethodId 
                                      AND e.id NOT IN(Select ppm.employeeid from hrms.payrollprocessingmethod ppm 
                                                       WHERE  (pm.month = ppm.month
                                                        AND pm.year = ppm.year)))
                                      OR (eb.payrollprocessingmethodid =0 
                                           AND Extract(month FROM disburseon) = pm.month 
                                           AND ( Extract(year FROM disburseon) = pm.year ) ) )";

                return await Connection.QueryAsync<EmployeeBonusView>(sql, new { payrollProcessingMethodId });
        }
    }
}