using Chef.Common.Core.Extensions;
using Chef.HRMS.Models.PayrollProcessing;

namespace Chef.HRMS.Repositories;

public class PayrollProcessingMethodRepository : TenantRepository<PayrollProcessingMethod>, IPayrollProcessingMethodRepository
{
    public PayrollProcessingMethodRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<PayrollProcessingMethod>> GetAllByProcessignStep(int stepno)
    {
        var sql = @"SELECT
                      ppm.*,
                      emp.displayname AS employeename,
                      jd.employeenumber AS employeecode
                    FROM hrms.payrollprocessingmethod ppm
                    LEFT JOIN hrms.hrmsemployee emp
                      ON emp.id = ppm.employeeid
                    LEFT JOIN hrms.jobdetails jd
                      ON jd.employeeid = ppm.employeeid
                    WHERE processedstep >= @stepno
                    AND ppm.isarchived = FALSE
                    ORDER BY id ASC";

        return await Connection.QueryAsync<PayrollProcessingMethod>(sql, new { stepno });
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

    public async Task<int> InsertOrAlreadyExist(PayrollProcessingMethod payrollProcessingMethod)
    {
        int payrollProcessingMethodId = 0;
        //using (var transaction = Connection.BeginTransaction())
        //{
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
                        throw new Exception("Already Exist");
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
                            throw new Exception("Already Exist");
                        }
                        else
                        {
                            var sql = new QueryBuilder<PayrollProcessingMethod>().GenerateInsertQuery();
                            payrollProcessingMethodId = await Connection.QueryFirstOrDefaultAsync<int>(sql, payrollProcessingMethod);
                        }
                    }
                }
                else
                {
                    var sql = new QueryBuilder<PayrollProcessingMethod>().GenerateInsertQuery();
                    payrollProcessingMethodId = await Connection.QueryFirstOrDefaultAsync<int>(sql, payrollProcessingMethod);
                }
                //transaction.Commit();
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                //transaction.Rollback();
            }
            return payrollProcessingMethodId;
        //}
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

    public async Task<IEnumerable<LeaveEligibility>> GetProcessedEmployeeDetailsForLeaveAccrual(int paygroupid)
    {
        var sql = @"SELECT DISTINCT
                          ppm.employeeid,
                          ppm.id AS payrollprocessingid,
                          le.*,
                          esd.monthlyamount,
                          emp.displayname AS employeename,
                          jd.employeenumber AS employeecode
                        FROM hrms.payrollprocessingmethod ppm
                        LEFT JOIN hrms.hrmsemployee emp
                          ON emp.id = ppm.employeeid
                        LEFT JOIN hrms.jobdetails jd
                          ON jd.employeeid = ppm.employeeid
                        LEFT JOIN hrms.jobfiling jf
                          ON jf.employeeid = ppm.employeeid
                        LEFT JOIN hrms.leavestructureleavecomponent lslc
                          ON lslc.leavestructureid = jf.leavestructureid
                        LEFT JOIN hrms.leaveeligibility le
                          ON le.leavecomponentid = lslc.leavecomponentid
                        LEFT JOIN hrms.employeesalaryconfigurationdetails esd
                          ON le.leavecomponentid = esd.payrollcomponentid
                        WHERE ppm.paygroupid = @paygroupid
                        AND le.leavetype = 1";
        //, esd.monthlyamount Join hrms.employeesalaryconfigurationdetails esd on le.leavecomponentid = esd.payrollcomponentid

        return await Connection.QueryAsync<LeaveEligibility>(sql, new { paygroupid });
    }

    public async Task<IEnumerable<EndOfService>> GetProcessedEmployeeDetailsForEOSAccrual(int paygroupid)
    {
        var sql = @"SELECT DISTINCT
                      jf.employeeid,
                      jf.paygroupid,
                      eos.*,
                      esd.monthlyamount,
                      emp.displayname AS employeename,
                      jd.employeenumber AS employeecode,
                      jd.dateofjoin,
                      jd.probationperiod,
                      jf.eosid
                    FROM hrms.jobfiling jf
                    LEFT JOIN hrms.hrmsemployee emp
                      ON emp.id = jf.employeeid
                    LEFT JOIN hrms.jobdetails jd
                      ON jd.employeeid = jf.employeeid
                    LEFT JOIN hrms.endofservice eos
                      ON eos.id = jf.eosid
                    LEFT JOIN hrms.employeesalaryconfigurationdetails esd
                      ON eos.id = esd.payrollcomponentid
                    WHERE jf.paygroupid = @paygroupid";

        return await Connection.QueryAsync<EndOfService>(sql, new { paygroupid });
    }

    public async Task<IEnumerable<EmployeeTicket>> GetProcessedEmployeeDetailsForTicketAccrual(int paygroupid)
    {
        var sql = @"SELECT DISTINCT
                      jf.employeeid,
                      jf.paygroupid,
                      et.amount,
                      emp.displayname AS employeename,
                      jd.employeenumber AS employeecode,
                      jd.dateofjoin,
                      le.eligibledays,
                      le.eligibilitybase,
                      le.isincludelopdays
                    FROM hrms.jobfiling jf
                    LEFT JOIN hrms.hrmsemployee emp
                      ON emp.id = jf.employeeid
                    LEFT JOIN hrms.jobdetails jd
                      ON jd.employeeid = jf.employeeid
                    JOIN hrms.leavestructureleavecomponent lslc
                      ON lslc.leavestructureid = jf.leavestructureid
                    JOIN hrms.leaveeligibility le
                      ON le.leavecomponentid = lslc.leavecomponentid
                    JOIN hrms.employeesalaryconfigurationdetails esd
                      ON le.leavecomponentid = esd.payrollcomponentid
                    JOIN hrms.employeeticket et
                      ON et.id = jf.employeeid
                    WHERE jf.paygroupid = @paygroupid
                    AND le.leavetype = 1";

        return await Connection.QueryAsync<EmployeeTicket>(sql, new { paygroupid });
    }

    public async Task<IEnumerable<PayrollMonth>> GetPayrollProcessingMonth(int paygroupId)
    {
        var sql = @"SELECT (ppm.month)  as month ,ppm.year, pgc.processingday, pg.timesheetcutoff, pg.leavecutoff
	                    FROM hrms.payrollprocessingmethod ppm
	                    LEFT JOIN hrms.paygroup pg ON ppm.paygroupid = pg.id
	                    LEFT JOIN hrms.payrollcalendar pgc ON pg.payrollcalendarid = pgc.id
	                    WHERE ppm.paygroupid=@paygroupId ORDER BY ppm.year DESC, ppm.month DESC LIMIT 1";
        return await Connection.QueryAsync<PayrollMonth>(sql, new { paygroupId });
    }
    public async Task<IEnumerable<PayrollComponentDetails>> GetPayrollComponentsSummary(int payrollprocessid)
    {
        var sql = @"select pcd.payrollprocessid,pcd.payrollprocessdate,pcd.employeeid, emp.displayname as employeename,
                        pcd.earningsamt, pcd.deductionamt, jd.employeenumber as employeecode,
                        pcd.payrollcomponentid,pc.name as payrollcomponentname
                        from hrms.payrollcomponentdetails pcd 
                        left join hrms.hrmsemployee emp 
                        on emp.id = pcd.employeeid 
                        join hrms.payrollcomponent pc on pc.id = pcd.payrollcomponentid
                        left join hrms.jobdetails jd on jd.employeeid = pcd.employeeid
                        where payrollprocessid = @payrollprocessid and pcd.isarchived = false";

        return await Connection.QueryAsync<PayrollComponentDetails>(sql, new { payrollprocessid });
    }

    public async Task<int> InsertPayrollFixedComponentDetails(int payrollProcessId, DateTime payrollprocessDate, int paygroupId)
    {
        var deletedRowCount = await DeletePayrollFixedComponentDetails(paygroupId);

        DateTime currentDate = DateTime.Now;
        var sql = @"INSERT INTO hrms.payrollcomponentdetails(employeeid, payrollcomponentid, earningsamt,
            deductionamt, processstatus, createdby, createddate,  isarchived, payrollprocessid,payrollprocessdate, stepno)
            (SELECT distinct esc.employeeid as employeeid, escd.payrollcomponentid as payrollcomponentid,
            escd.monthlyamount as earningsamt, 0 as deductionamt, 0 as processedStatus, 'system', @currentDate,false,@payrollProcessId,@payrollprocessDate,0 as stepno
            from hrms.employeesalaryconfiguration esc join hrms.employeesalaryconfigurationdetails escd
            on esc.id = escd.employeesalaryconfigurationid
            left join hrms.payrollcomponent pc on escd.payrollcomponentid = pc.id
            left join hrms.jobfiling jf on esc.employeeid = jf.employeeid
            left join hrms.paygroup pg on jf.paygroupid = pg.id
            where esc.isarchived = false and pg.id = @paygroupId and pc.payheadtype = 1)";

        return await Connection.ExecuteAsync(sql, new { currentDate, payrollProcessId, paygroupId, payrollprocessDate });
    }

    private async Task<int> DeletePayrollFixedComponentDetails(int paygroupId)
    {
        var sql = @"DELETE from hrms.payrollcomponentdetails where id in (
            (SELECT distinct pcd.id from hrms.payrollcomponentdetails pcd
             join
            hrms.employeesalaryconfiguration esc on pcd.employeeid = esc.employeeid
             join hrms.employeesalaryconfigurationdetails escd
            on esc.id = escd.employeesalaryconfigurationid
            left join hrms.payrollcomponent pc on escd.payrollcomponentid = pc.id
            left join hrms.jobfiling jf on esc.employeeid = jf.employeeid
            left join hrms.paygroup pg on jf.paygroupid = pg.id
            where esc.isarchived = false and pg.id = @paygroupId and pc.payheadtype = 1 and pcd.isarchived=false and pcd.stepno = 0))";


        return await Connection.ExecuteAsync(sql, new { paygroupId });
    }
    public async Task<bool> IsPaygroupExistInPayrollProcessingMethod(int paygroupId)
    {
        if (await QueryFactory
        .Query<PayrollProcessingMethod>()
       .Where("paygroupid", paygroupId)
       .WhereNotArchived()
       .CountAsync<int>() > 0) return true;
        else return false;
    }

    public async Task<bool> IsPreviousPayrollProcessed(int PreviousMonth, int previousYear, int employeeId)
    {
        if (await QueryFactory
        .Query<PayrollProcessingMethod>()
       .Where("month", PreviousMonth)
       .Where("year", previousYear)
       .Where("employeeid", employeeId)
       .WhereNotArchived()
       .CountAsync<int>() > 0) return true;
        else return false;
    }

    public async Task<IEnumerable<PayrollProcessCompletedView>> GetPayrollProcessSalaryDetails(int payrollProcessId)
    {
        var sql = @"SELECT
                      pcd.payrollprocessid,
                      pcd.payrollprocessdate,
                      pcd.employeeid,
                      pcd.earningsamt,
                      pcd.deductionamt,
                      pcd.payrollcomponentid,
                      pc.name AS payrollcomponentname,
                      pc.payheadbaseunittype,
                      emp.displayname AS employeename,
                      jd.employeenumber AS employeecode
                    FROM hrms.payrollcomponentdetails pcd
                    LEFT JOIN hrms.hrmsemployee emp
                      ON emp.id = pcd.employeeid
                    JOIN hrms.payrollcomponent pc
                      ON pc.id = pcd.payrollcomponentid
                    LEFT JOIN hrms.jobdetails jd
                      ON jd.employeeid = pcd.employeeid
                    WHERE payrollprocessid = @payrollProcessId
                    AND pcd.isarchived = FALSE";

        return await Connection.QueryAsync<PayrollProcessCompletedView>(sql, new { payrollProcessId });
    }
}
