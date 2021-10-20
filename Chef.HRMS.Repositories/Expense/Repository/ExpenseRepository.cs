using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class ExpenseRepository : GenericRepository<Expense>, IExpenseRepository
    {
        public ExpenseRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<Expense>> GetAllExpenseDetailsById(int employeeId)
        {

                var sql = "SELECT * FROM  hrms.expense WHERE employeeid = @employeeId  ORDER BY id";

                return await Connection.QueryAsync<Expense>(sql, new { employeeId });
        }
        public async Task<IEnumerable<Expense>> GetAllUnApprovedExpenseById(int employeeId)
        {

                var sql = @"SELECT e.* from hrms.expense e 
	                                        INNER JOIN hrms.jobdetails jd
                                            ON jd.employeeid = e.employeeid
                                            WHERE jd.reportingmanager = @employeeId
	                                        AND e.requeststatus = 2 and e.ispaid=false";

                return await Connection.QueryAsync<Expense>(sql, new { employeeId });
        }
        public async Task<ExpenseView> GetMaximumExpenseAmountById(int employeeId, int expenseConfigurationId, int expensePeriodType, DateTime currentDate)
        {

                var sql = @"SELECT expenseperiodtype, 
                                   maximumexpenselimit, 
                                   CASE expenseperiodtype 
                                     WHEN 1 THEN (SELECT Sum(COALESCE(amount, 0)) AS totalAmount 
                                                  FROM   hrms.expense 
                                                  WHERE  Date_part('day', createddate) = 
                                                         Date_part('day', @currentDate) 
                                                         AND employeeid = @employeeId 
                                                         AND expenseconfigurationid = @expenseConfigurationId) 
                                     WHEN 2 THEN (SELECT Sum(COALESCE(amount, 0)) AS totalAmount 
                                                  FROM   hrms.expense 
                                                  WHERE  Date_part('week', createddate) = 
                                                         Date_part('week', @currentDate) 
                                                         AND employeeid = @employeeId 
                                                         AND expenseconfigurationid = @expenseConfigurationId) 
                                     WHEN 3 THEN (SELECT Sum(COALESCE(amount, 0)) AS totalAmount 
                                                  FROM   hrms.expense 
                                                  WHERE  Date_part('month', createddate) = 
                                                         Date_part('month', @currentDate) 
                                                         AND employeeid = @employeeId 
                                                         AND expenseconfigurationid = @expenseConfigurationId) 
                                     ELSE (SELECT Sum(COALESCE(amount, 0)) AS totalAmount 
                                           FROM   hrms.expense 
                                           WHERE  Date_part('year', createddate) = 
                                                  Date_part('year', @currentDate) 
                                                  AND employeeid = @employeeId 
                                                  AND expenseconfigurationid = @expenseConfigurationId) 
                                   END 
                            FROM   hrms.expense 
                                   CROSS JOIN hrms.expensepolicyconfiguration epc
                            WHERE  epc.expenseperiodtype = @expenseperiodtype 
                                   AND epc.id = @expenseConfigurationId
                            GROUP  BY expenseperiodtype, 
                                      maximumexpenselimit";

                return await Connection.QueryFirstOrDefaultAsync<ExpenseView>(sql, new { employeeId, expenseConfigurationId, expensePeriodType, currentDate });

        }

        public async Task<ExpenseView> GetMaximumInstancesById(int employeeId, int expenseConfigurationId, int instancesPeriodType)
        {

                var sql = @"SELECT instancesperiodtype, 
                                   maximuminstanceslimit, 
                                   CASE instancesperiodtype 
                                     WHEN 1 THEN (SELECT Count(COALESCE(id, 0)) AS totalRequest 
                                                  FROM   hrms.expense 
                                                  WHERE  Date_part('day', createddate) = 
                                                         Date_part('day', CURRENT_DATE) 
                                                         AND employeeid = @employeeId 
                                                         AND expenseconfigurationid = @expenseConfigurationId) 
                                     WHEN 2 THEN (SELECT Count(COALESCE(id, 0)) AS totalRequest 
                                                  FROM   hrms.expense 
                                                  WHERE  Date_part('week', createddate) = 
                                                         Date_part('week', CURRENT_DATE) 
                                                         AND employeeid = @employeeId 
                                                         AND expenseconfigurationid = @expenseConfigurationId) 
                                     WHEN 3 THEN (SELECT Count(COALESCE(id, 0)) AS totalRequest 
                                                  FROM   hrms.expense 
                                                  WHERE  Date_part('month', createddate) = 
                                                         Date_part('month', CURRENT_DATE) 
                                                         AND employeeid = @employeeId 
                                                         AND expenseconfigurationid = @expenseConfigurationId) 
                                     ELSE (SELECT Count(COALESCE(id, 0)) AS totalRequest 
                                           FROM   hrms.expense 
                                           WHERE  Date_part('year', createddate) = 
                                                  Date_part('year', CURRENT_DATE) 
                                                  AND employeeid = @employeeId 
                                                  AND expenseconfigurationid = @expenseConfigurationId) 
                                   END 
                            FROM   hrms.expense 
                                   CROSS JOIN hrms.expensepolicyconfiguration epc
                            WHERE  epc.instancesperiodtype = @instancesperiodtype 
                                   AND epc.id = @expenseConfigurationId
                            GROUP  BY instancesperiodtype, 
                                      maximuminstanceslimit";

                return await Connection.QueryFirstOrDefaultAsync<ExpenseView>(sql, new { employeeId, expenseConfigurationId, instancesPeriodType });

        }
    }
}
