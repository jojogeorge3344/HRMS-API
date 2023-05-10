using Chef.Common.Models;
using Chef.HRMS.Models;
using System;

namespace Chef.HRMS.Repositories
{
    public class PayrollProcessingMethodRepository : TenantRepository<PayrollProcessingMethod>, IPayrollProcessingMethodRepository
    {
        public PayrollProcessingMethodRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<PayrollReview>> GetAllPayrollReviewByProcessingMethodId(int payrollProcessingMethodId)
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
                                    FROM   hrms.payrollbasiccomponent 
                                    WHERE  payrollprocessingmethodid = @payrollProcessingMethodId 
                                    GROUP  BY employeeid, 
                                              employeename, 
                                              employeecode)Q1 
                                   LEFT JOIN (SELECT eb.employeeid, 
                                                     Sum(COALESCE(eb.amount, 0)) bonus 
                                              FROM   hrms.employeebonus eb 
                                                     INNER JOIN hrms.payrollprocessingmethod ppm 
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
                                              FROM   hrms.loanrequest lr 
                                                     INNER JOIN hrms.payrollprocessingmethod pm 
                                                             ON 1 = 1 
                                                                AND pm.id = @payrollProcessingMethodId 
                                              WHERE  (( Extract(month FROM expectedon) = pm.month )) 
                                                     AND ( Extract(year FROM expectedon) = pm.year ) 
                                              GROUP  BY lr.employeeid)Q3 
                                          ON Q1.employeeid = Q3.employeeid 
                                   LEFT JOIN (SELECT employeeid, 
                                                     Sum(COALESCE(emiamount, 0)) emi 
                                              FROM   hrms.loanpayment 
                                              WHERE  payrollprocessingmethodid = @payrollProcessingMethodId 
                                              GROUP  BY employeeid)Q4 
                                          ON Q1.employeeid = Q4.employeeid 
                                   LEFT JOIN (SELECT employeeid, 
                                                     Sum(COALESCE(amount, 0)) deduction 
                                              FROM   hrms.adhocdeduction 
                                              WHERE  payrollprocessingmethodid = @payrollProcessingMethodId 
                                              GROUP  BY employeeid)Q5 
                                          ON Q1.employeeid = Q5.employeeid 
                                   LEFT JOIN(WITH cte (employeeid, ppm) 
										 AS (SELECT employeeid, 
													payrollprocessingmethodid 
											 FROM   hrms.leaveandattendance 
											 WHERE  payrollprocessingmethodid = @payrollProcessingMethodId 
											 GROUP  BY employeeid, 
													   payrollprocessingmethodid) 
									SELECT employeeid, 
										   lossofpay, 
										   lopdeduction 
									FROM   cte, 
										   hrms.Calculate_lop(cte.employeeid, cte.ppm))Q6
									ON Q1.employeeid=Q6.employeeid";

            return await Connection.QueryAsync<PayrollReview>(sql, new { payrollProcessingMethodId });
        }

        public async Task<IEnumerable<PayrollReviewBreakup>> GetPayBreakUpByEmployeeId(int employeeId, int payrollProcessingMethodId)
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
                                             FROM   hrms.payrollbasiccomponent 
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
                                                         FROM   hrms.employeebonus eb 
                                                                INNER JOIN hrms.bonustype bt 
                                                                        ON eb.bonustypeid = bt.id 
                                                                           AND eb.employeeid = @employeeId 
                                                                INNER JOIN hrms.payrollprocessingmethod pm 
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
                                                                  FROM       hrms.loanrequest lr 
                                                                  INNER JOIN hrms.payrollprocessingmethod pm 
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
                                                                 FROM   hrms.adhocdeduction 
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
                                                                    FROM   hrms.loanpayment 
                                                                    WHERE  employeeid = @employeeId 
                                                                    AND    payrollprocessingmethodid = @payrollprocessingmethodId 
                                                             )SELECT * 
                                                      FROM   ctealrp)";

            return await Connection.QueryAsync<PayrollReviewBreakup>(sql, new { employeeId, payrollProcessingMethodId });
        }

        public async Task<string> InsertOrAlreadyExist(PayrollProcessingMethod payrollProcessingMethod)
        {
            int result = 0;
            using (var transaction = Connection.BeginTransaction())
            {
                try
                {
                    if (payrollProcessingMethod.PayGroupId == 0)
                    {
                        var employeeId = payrollProcessingMethod.EmployeeId;
                        var year = payrollProcessingMethod.Year;
                        var month = payrollProcessingMethod.Month;

                        var getEmp = @"SELECT distinct *
							                            FROM hrms.payrollprocessingmethod  pm
							                            INNER JOIN hrms.jobfiling jf
							                            ON jf.paygroupid=pm.paygroupid
							                            AND(year=@year AND month=@month)	
                                                        WHERE  jf.employeeid=@employeeId
                                                        AND pm.processedstep=5";

                        var data = await Connection.QueryFirstOrDefaultAsync<string>(getEmp, new { employeeId, year, month });

                        if (data != null)
                        {
                            return "Already Exist";
                        }
                        else
                        {
                            var get = @"SELECT Distinct  ppm.id
							                            FROM hrms.jobfiling  jf
							                            INNER JOIN hrms.payrollprocessingmethod ppm
							                            ON jf.employeeid=ppm.employeeid
							                            AND(year=@year AND month=@month)	
                                                        WHERE  jf.employeeid=@employeeId
                                                        AND ppm.processedstep=5";

                            var info = await Connection.QueryFirstOrDefaultAsync<string>(get, new { employeeId, year, month });
                            if (info != null)
                            {
                                return "Already Exist";
                            }
                            else
                            {
                                var sql = new QueryBuilder<PayrollProcessingMethod>().GenerateInsertQuery();
                                await Connection.QueryFirstOrDefaultAsync<string>(sql, payrollProcessingMethod);



                            }


                        }

                    }
                    else
                    {

                        var sql = new QueryBuilder<PayrollProcessingMethod>().GenerateInsertQuery();
                        await Connection.QueryFirstOrDefaultAsync<string>(sql, payrollProcessingMethod);



                    }
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    string msg = ex.Message;
                    transaction.Rollback();
                }
                return result.ToString();
            }
        }

        public async Task<int> UpadtePayrollProcessingStep(int payrollProcessingMethodId, int completedStep)
        {
            var sql = @"UPDATE hrms.payrollprocessingmethod 
                            SET    processedstep = @completedStep 
                            WHERE  id = @payrollProcessingMethodId 
                                   AND processedstep < @completedStep";

            return await Connection.ExecuteAsync(sql, new { payrollProcessingMethodId, completedStep });
        }

        public async Task<int> InsertLOPDeduction(IEnumerable<LOPDeduction> lopDeduction)
        {
            var sql = new QueryBuilder<LOPDeduction>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");
            return await Connection.ExecuteAsync(sql, lopDeduction);
        }

        public async Task<IEnumerable<HRMSEmployee>> GetAllUnProcessedEmployees(int year, int month)
        {
            var sql = @"SELECT id, ( Concat(e.firstname, ' ', e.lastname) ) AS name FROM hrms.HRMSEmployee WHERE id NOT IN
						                              (SELECT DISTINCT jf.employeeid from hrms.payrollprocessingmethod PM		
						                              INNER JOIN hrms.jobfiling jf
						                              ON (jf.paygroupid=pm.paygroupid OR
							                            jf.employeeid=pm.employeeid)
						                              AND(pm.year=@year AND pm.month=@month))";

            return await Connection.QueryAsync<HRMSEmployee>(sql, new { year, month });
        }

        public async Task<IEnumerable<PayrollProcessingMethod>> GetPastSixMonthDetails()
        {
            var sql = @"SELECT * FROM hrms.payrollprocessingmethod PM
		                             WHERE (pm.year=EXTRACT(YEAR FROM NOW())
	                                 AND pm.month BETWEEN EXTRACT(MONTH FROM NOW() - INTERVAL '6 months')
                                     AND EXTRACT(MONTH FROM NOW()))
                                     ORDER BY pm.month";

            return await Connection.QueryAsync<PayrollProcessingMethod>(sql);
        }

        public async Task<int> GetDetailsById(int employeeid, int month, int year)
        {
            int result = 0;
            var sql = @"SELECT employeeid ,
		                        month ,
		                        year 
                        FROM   hrms.payrollprocessingmethod
                        WHERE processedstep = 5 AND employeeid=@employeeid AND month=@month AND year=@year";
            result = await Connection.QueryFirstOrDefaultAsync<int>(sql, new { employeeid, month, year });
            if (result == 0)
            {
                return 0;
            }
            else
            {
                return 1;
            }
        }

        public async Task<IEnumerable<PayrollProcessingMethod>> GetDetailsByPaygroupId(int paygroupid, int prevmonth, int prevyear)
        {
            var sql = @"SELECT ppm.processedstep,ppm.name, ppm.month, 
                        ppm.year,pg.startingyear, pg.startingmonth FROM hrms.payrollprocessingmethod ppm 
                        right join hrms.paygroup pg on pg.id = ppm.paygroupid where pg.id = @paygroupid
                        and year = @prevyear and month = @prevmonth ORDER BY pg.id ASC ";
            return await Connection.QueryAsync<PayrollProcessingMethod>(sql, new { paygroupid, prevmonth, prevyear });
        }

        public async Task<IEnumerable<PayrollProcessingMethod>> GetEmployeeDetails(int employeeid, int paygroupid)
        {
            var sql = @"SELECT*FROM hrms.payrollprocessingmethod
                        WHERE employeeid=@employeeid
                        AND paygroupid=@paygroupid";

            return await Connection.QueryAsync<PayrollProcessingMethod>(sql, new { employeeid, paygroupid });
        }

        public async Task<IEnumerable<PayrollMonth>> GetPayrollProcessingMonth(int paygroupId)
        {
            var sql = @"SELECT ppm.month,ppm.year, pgc.processingday, pg.timesheetcutoff, pg.leavecutoff
	                    FROM hrms.payrollprocessingmethod ppm
	                    LEFT JOIN hrms.paygroup pg ON ppm.paygroupid = pg.id
	                    LEFT JOIN hrms.payrollcalendar pgc ON pg.payrollcalendarid = pgc.id
	                    WHERE ppm.paygroupid=@paygroupId ORDER BY ppm.year DESC, ppm.month DESC LIMIT 1";
            return await Connection.QueryAsync<PayrollMonth>(sql, new { paygroupId });
        }
    }
}
