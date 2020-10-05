﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class EmployeeBonusRepository : GenericRepository<EmployeeBonus>, IEmployeeBonusRepository
    {
        public EmployeeBonusRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<EmployeeBonus>> GetAllBonusByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = "SELECT * FROM  employeebonus WHERE employeeid = @employeeId";

                return await Connection.QueryAsync<EmployeeBonus>(sql, new { employeeId });
            }
        }

        public async Task<IEnumerable<EmployeeBonusView>> GetAllBonusByEmployeeIdAndPayrollProcessingMethodId(int employeeId, int payrollProcessingMethodId)
        {
            using (Connection)
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
                            FROM   employee e 
                                   INNER JOIN jobdetails jd 
                                           ON e.id = jd.employeeid 
                                   INNER JOIN employeebonus eb 
                                           ON e.id = eb.employeeid 
                                   INNER JOIN bonustype bt 
                                           ON eb.bonustypeid = bt.id 
                                              AND eb.employeeid = @employeeId 
                                   INNER JOIN payrollprocessingmethod pm 
                                           ON 1 = 1 
                                              AND pm.id = @payrollProcessingMethodId 
                            WHERE  ( eb.payrollprocessingmethodid = @payrollProcessingMethodId 
                                      OR (eb.payrollprocessingmethodid =0 
                                           AND Extract(month FROM disburseon) = pm.month 
                                           AND ( Extract(year FROM disburseon) = pm.year ) ) ) ";

                return await Connection.QueryAsync<EmployeeBonusView>(sql, new { employeeId, payrollProcessingMethodId });
            }
        }

        public async Task<int> DeleteAllBonusByEmployeeId(int employeeId)
        {
            using (Connection)
            {
                var sql = @"Delete FROM employeebonus WHERE employeeId = @employeeId";

                return await Connection.ExecuteAsync(sql, employeeId);
            }
        }

        public async Task<IEnumerable<EmployeeBonusView>> GetAllBonusByPayGroupId(int payrollProcessingMethodId)
        {
            using (Connection)
            {
                var sql = @"SELECT pm.paygroupid                         AS paygroupid, 
                                   e.id                                  AS employeeid, 
                                   Concat (e.firstname, ' ', e.lastname) AS NAME, 
                                   jd.employeenumber                     AS employeecode, 
                                   eb.bonustypeid                        AS bonustypeid, 
                                   eb.id                                 AS employeebonusid, 
                                   bt.NAME                               AS bonustype, 
                                   eb.amount                             AS amount, 
                                   eb.disburseon                         AS disburseOn, 
                                   eb.remarks                            AS remarks 
                            FROM   employee e 
                                   INNER JOIN jobdetails jd 
                                           ON e.id = jd.employeeid 
                                   INNER JOIN employeebonus eb 
                                           ON e.id = eb.employeeid 
                                   INNER JOIN bonustype bt 
                                           ON bt.id = eb.bonustypeid 
                                   INNER JOIN payrollprocessingmethod pm 
                                           ON 1 = 1 
                                              AND pm.id =  @payrollProcessingMethodId
                                              
                            WHERE  (( eb.payrollprocessingmethodid = @payrollProcessingMethodId 
                                      AND e.id NOT IN(Select ppm.employeeid from payrollprocessingmethod ppm 
                                                       WHERE  (pm.month = ppm.month
                                                        AND pm.year = ppm.year)))
                                      OR (eb.payrollprocessingmethodid =0 
                                           AND Extract(month FROM disburseon) = pm.month 
                                           AND ( Extract(year FROM disburseon) = pm.year ) ) )";

                return await Connection.QueryAsync<EmployeeBonusView>(sql, new {payrollProcessingMethodId });
            }
        }
    }
}