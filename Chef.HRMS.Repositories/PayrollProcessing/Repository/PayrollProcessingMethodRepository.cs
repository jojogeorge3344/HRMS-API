﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class PayrollProcessingMethodRepository : GenericRepository<PayrollProcessingMethod>, IPayrollProcessingMethodRepository
    {
        public PayrollProcessingMethodRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<PayrollReview>> GetAllPayrollReviewByProcessingMethodId(int payrollProcessingMethodId)
        {
            using (Connection)
            {
                var sql = @"SELECT Q1.*, 
                                   COALESCE(Q2.bonus, 0)      bonus, 
                                   COALESCE(Q3.loanamount, 0) loanamount, 
                                   COALESCE(Q4.emi, 0)        emiamount, 
                                   COALESCE(Q5.deduction, 0)  deduction,
                                   COALESCE(Q6.lossofpay, 0)  lopCount,
								   COALESCE(Q6.lopdeduction, 0)  lopAmount
                            FROM   (SELECT employeeid, 
                                           employeename, 
                                           employeecode, 
                                           Sum(COALESCE(monthlyamount, 0)) basic 
                                    FROM   payrollbasiccomponent 
                                    WHERE  payrollprocessingmethodid = @payrollProcessingMethodId 
                                    GROUP  BY employeeid, 
                                              employeename, 
                                              employeecode)Q1 
                                   LEFT JOIN (SELECT eb.employeeid, 
                                                     Sum(COALESCE(eb.amount, 0)) bonus 
                                              FROM   employeebonus eb 
                                                     INNER JOIN payrollprocessingmethod ppm 
                                                             ON 1 = 1 
                                                                AND ppm.id = @payrollProcessingMethodId 
                                              WHERE  eb.payrollprocessingmethodid = @payrollProcessingMethodId 
                                                      OR ( eb.payrollprocessingmethodid = 0 
                                                           AND ( Extract(month FROM eb.disburseon) = 
                                                                 ppm.month 
                                                                 AND ( Extract(year FROM eb.disburseon) = 
                                                                       ppm.year 
                                                                     ) ) ) 
                                              GROUP  BY eb.employeeid)Q2 
                                          ON Q1.employeeid = Q2.employeeid 
                                   LEFT JOIN (SELECT lr.employeeid, 
                                                     Sum(COALESCE(loanamount, 0)) loanamount 
                                              FROM   loanrequest lr 
                                                     INNER JOIN payrollprocessingmethod pm 
                                                             ON 1 = 1 
                                                                AND pm.id = @payrollProcessingMethodId 
                                              WHERE  (( Extract(month FROM expectedon) = pm.month )) 
                                                     AND ( Extract(year FROM expectedon) = pm.year ) 
                                              GROUP  BY lr.employeeid)Q3 
                                          ON Q1.employeeid = Q3.employeeid 
                                   LEFT JOIN (SELECT employeeid, 
                                                     Sum(COALESCE(emiamount, 0)) emi 
                                              FROM   loanpayment 
                                              WHERE  payrollprocessingmethodid = @payrollProcessingMethodId 
                                              GROUP  BY employeeid)Q4 
                                          ON Q1.employeeid = Q4.employeeid 
                                   LEFT JOIN (SELECT employeeid, 
                                                     Sum(COALESCE(amount, 0)) deduction 
                                              FROM   adhocdeduction 
                                              WHERE  payrollprocessingmethodid = @payrollProcessingMethodId 
                                              GROUP  BY employeeid)Q5 
                                          ON Q1.employeeid = Q5.employeeid 
                                   LEFT JOIN(WITH cte (employeeid, ppm) 
										 AS (SELECT employeeid, 
													payrollprocessingmethodid 
											 FROM   leaveandattendance 
											 WHERE  payrollprocessingmethodid = @payrollProcessingMethodId 
											 GROUP  BY employeeid, 
													   payrollprocessingmethodid) 
									SELECT employeeid, 
										   lossofpay, 
										   lopdeduction 
									FROM   cte, 
										   Calculate_lop(cte.employeeid, cte.ppm))Q6
									ON Q1.employeeid=Q6.employeeid";

                return await Connection.QueryAsync<PayrollReview>(sql, new { payrollProcessingMethodId });
            }
        }

        public async Task<IEnumerable<PayrollReviewBreakup>> GetPayBreakUpByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            using (Connection)
            {
                var sql = @"( 
                                 WITH ctebasic 
                                      ( 
                                           type, 
                                           NAME, 
                                           description, 
                                           amount 
                                      ) 
                                      AS 
                                      ( 
                                             SELECT 'Basic', 
                                                    payrollcomponentname, 
                                                    shortcode, 
                                                    monthlyamount 
                                             FROM   payrollbasiccomponent 
                                             WHERE  employeeid=@employeeId 
                                             AND    payrollprocessingmethodid=@payrollprocessingmethodId 
                                      )SELECT   * 
                                FROM     ctebasic 
                                ORDER BY description ASC 
                                 ) 
                                UNION ALL 
                                          ( 
                                               WITH ctebonus (type, NAME, description, amount) 
                                                     AS (SELECT 'Bonus', 
                                                                bt.NAME, 
                                                                'NA' AS remarks, 
                                                                COALESCE(amount, 0) 
                                                         FROM   employeebonus eb 
                                                                INNER JOIN bonustype bt 
                                                                        ON eb.bonustypeid = bt.id 
                                                                           AND eb.employeeid = @employeeId 
                                                                INNER JOIN payrollprocessingmethod pm 
                                                                        ON 1 = 1 
                                                                           AND pm.id = @payrollprocessingmethodId 
                                                         WHERE  ( eb.payrollprocessingmethodid = @payrollprocessingmethodId 
                                                                   OR ( eb.payrollprocessingmethodid = 0 
                                                                        AND ( Extract(month FROM disburseon) = pm.month 
                                                                              AND ( Extract(year FROM disburseon) = pm.year ) ) 
                                                                      ) )) 
                                                SELECT * 
                                                FROM   ctebonus) 
                                   UNION ALL 
                                             ( 
                                                  WITH ctealr 
                                                       ( 
                                                            type, 
                                                            NAME, 
                                                            description, 
                                                            amount 
                                                       ) 
                                                       AS 
                                                       ( 
                                                                  SELECT     'ALR' AS type, 
                                                                             CASE loantype 
                                                                                        WHEN 1 THEN 'Advance' 
                                                                                        WHEN 2 THEN 'Loan' 
                                                                             END AS NAME, 
                                                                             loanno, 
                                                                             COALESCE(loanamount, 0) 
                                                                  FROM       loanrequest lr 
                                                                  INNER JOIN payrollprocessingmethod pm 
                                                                  ON         1=1 
                                                                  AND        pm.id=@payrollprocessingmethodId 
                                                                  WHERE      (( 
                                                                                                   extract(month FROM expectedon) = pm.month))
                                                                  AND        ( 
                                                                                        extract(year FROM expectedon) = pm.year)
                                                                  AND        lr.employeeid = @employeeId 
                                                       )SELECT * 
                                            FROM   ctealr) 
                                      UNION ALL 
                                                ( 
                                                     WITH cteadhoc 
                                                          ( 
                                                               type, 
                                                               NAME, 
                                                               description, 
                                                               amount 
                                                          ) 
                                                          AS 
                                                          ( 
                                                                 SELECT 'Adhoc', 
                                                                        deductionname, 
                                                                        'NA' AS description, 
                                                                        COALESCE(amount, 0) 
                                                                 FROM   adhocdeduction 
                                                                 WHERE  employeeid = @employeeId 
                                                                 AND    payrollprocessingmethodid = @payrollprocessingmethodId 
                                                          )SELECT * 
                                                   FROM   cteadhoc) 
                                         UNION ALL 
                                                   ( 
                                                        WITH ctealrp 
                                                             ( 
                                                                  type, 
                                                                  NAME, 
                                                                  description, 
                                                                  amount 
                                                             ) 
                                                             AS 
                                                             ( 
                                                                    SELECT 'ALRP' AS type, 
                                                                           CASE loantype 
                                                                                  WHEN 1 THEN 'Advance' 
                                                                                  WHEN 2 THEN 'Loan' 
                                                                           END AS NAME, 
                                                                           loanno, 
                                                                           COALESCE(emiamount, 0) 
                                                                    FROM   loanpayment 
                                                                    WHERE  employeeid = @employeeId 
                                                                    AND    payrollprocessingmethodid = @payrollprocessingmethodId 
                                                             )SELECT * 
                                                      FROM   ctealrp)";

                return await Connection.QueryAsync<PayrollReviewBreakup>(sql, new { employeeId, payrollProcessingMethodId });
            }
        }

        public async Task<string> InsertOrAlreadyExist(PayrollProcessingMethod payrollProcessingMethod)
        {
            using (Connection)
            {
                if (payrollProcessingMethod.PayGroupId == 0)
                {
                    var employeeId = payrollProcessingMethod.EmployeeId;
                    var year = payrollProcessingMethod.Year;
                    var month = payrollProcessingMethod.Month;

                    var getEmp = @"SELECT distinct *
							                            FROM payrollprocessingmethod  pm
							                            INNER JOIN jobfiling jf
							                            ON jf.paygroupid=pm.paygroupid
							                            AND(year=@year AND month=@month)	
                                                        WHERE  jf.employeeid=@employeeId";

                    var data = await Connection.QueryFirstOrDefaultAsync<string>(getEmp, new { employeeId, year, month });

                    if (data != null)
                    {
                        return "Already Exist";
                    }
                    else 
                    {
                        var get = @"SELECT Distinct  ppm.id
							                            FROM jobfiling  jf
							                            INNER JOIN payrollprocessingmethod ppm
							                            ON jf.employeeid=ppm.employeeid
							                            AND(year=@year AND month=@month)	
                                                        WHERE  jf.employeeid=@employeeId";

                        var info = await Connection.QueryFirstOrDefaultAsync<string>(get, new { employeeId, year, month });
                        if (info != null)
                        {
                            return "Already Exist";
                        }
                        else
                        {
                            var sql = new QueryBuilder<PayrollProcessingMethod>().GenerateInsertQuery();
                            var result = await Connection.QueryFirstOrDefaultAsync<string>(sql, payrollProcessingMethod);
                            return result.ToString();


                        }


                    }
                    
                }
                else
                {
                   
                        var sql = new QueryBuilder<PayrollProcessingMethod>().GenerateInsertQuery();
                        var result = await Connection.QueryFirstOrDefaultAsync<string>(sql, payrollProcessingMethod);
                        return result.ToString();

                   
                }
            }
        }

        public async Task<int> UpadtePayrollProcessingStep(int payrollProcessingMethodId, int completedStep)
        {
            using (Connection)
            {
                var sql = @"UPDATE PUBLIC.payrollprocessingmethod 
                            SET    processedstep = @completedStep 
                            WHERE  id = @payrollProcessingMethodId 
                                   AND processedstep < @completedStep";

                return await Connection.ExecuteAsync(sql, new { payrollProcessingMethodId, completedStep });
            }
        }

        public async Task<int> InsertLOPDeduction(IEnumerable<LOPDeduction> lopDeduction)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<LOPDeduction>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                return await Connection.ExecuteAsync(sql, lopDeduction);
            }
        }

        public async Task<IEnumerable<Employee>> GetAllUnProcessedEmployees(int year,int month)
        {
            using (Connection)
            {
                var sql = @"SELECT id, ( Concat(e.firstname, ' ', e.lastname) ) AS name FROM employee WHERE id NOT IN
						                              (SELECT DISTINCT jf.employeeid from payrollprocessingmethod PM		
						                              INNER JOIN jobfiling jf
						                              ON (jf.paygroupid=pm.paygroupid OR
							                            jf.employeeid=pm.employeeid)
						                              AND(pm.year=@year AND pm.month=@month))";

                return await Connection.QueryAsync<Employee>(sql ,new {year,month });
            }
        }

        public async Task<IEnumerable<PayrollProcessingMethod>> GetPastSixMonthDetails()
        {
            using (Connection)
            {
                var sql = @"SELECT * FROM payrollprocessingmethod PM
		                             WHERE (pm.year=EXTRACT(YEAR FROM NOW())
	                                 AND pm.month BETWEEN EXTRACT(MONTH FROM NOW() - INTERVAL '6 months')
                                     AND EXTRACT(MONTH FROM NOW()))
                                     ORDER BY pm.month";

                return await Connection.QueryAsync<PayrollProcessingMethod>(sql);
            }
        }
    }
}