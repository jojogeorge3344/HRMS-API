using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LoanPaymentRepository : GenericRepository<LoanPayment>, ILoanPaymentRepository
    {
        public LoanPaymentRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<EmployeeLoanView>> GetAllLoanPaymentByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            using (Connection)
            {
                var sql = @"SELECT 
                                                           lr.loantype                                   AS loantype, 
                                                           e.id                                          AS employeeid, 
                                                           lr.loanamount                                 AS amount, 
                                                           Concat (e.firstname, ' ', e.lastname)         AS NAME, 
                                                           jd.employeenumber                             AS employeecode, 
                                                           lr.loanno                                     AS loanNumber,  
                                                           pm.id                                         AS payrollProcessingmethodid, 
                                                           lr.loansettingid                              AS loansettingid,
                                                           lr.expectedon                                 AS disbursementdate, 
                                                           lr.id                                         AS loanid, 
                                                           ( ( lr.loanamount + ( lr.loanamount * ls.standardinterestrate ) / 100 ) / 
                                                             lr.repaymentterm )                          AS emiamount, 
                                                           ( ( lr.loanamount + ( lr.loanamount * ls.standardinterestrate ) / 100 ) 
                                                             - ( Sum( 
                                                             COALESCE((Select lp.emiamount where lp.loanid=lr.id), 0)) ) )             AS balanceamount, 
                                                           ( lr.repaymentterm - Count((Select lp.tenurenumber where lp.loanid=lr.id)) ) AS remainingtenure 
                                                    FROM   employee e 
                                                           INNER JOIN jobdetails jd 
                                                                   ON e.id = jd.employeeid 
                                                           INNER JOIN jobfiling jf
														           ON e.id=jf.employeeid
														    INNER JOIN payrollProcessingMethod pm
                                                                  ON pm.employeeId=@employeeId 
                                                                  AND pm.id=@payrollProcessingMethodId
                                                            LEFT JOIN loanrequest lr 
                                                                   ON e.id = lr.employeeid 
																   AND
                                                                     lr.emistartsfrommonth <= pm.month
                                                                   AND
																     lr.emistartsfromyear <= pm.year 
                                                            LEFT JOIN loanpayment lp 
                                                                  ON lr.id = lp.loanid
                                                                 AND lp.balanceamount > 0 AND remainingtenure >0 
                                                            INNER JOIN loansetting ls 
                                                                   ON ls.id = lr.loansettingid       
                                                    GROUP  BY lr.loantype, 
                                                              e.id, 
                                                              lr.id, 
                                                              lr.loanamount, 
                                                              e.displayname, 
                                                              jd.employeenumber, 
                                                              lr.loanno, 
                                                              pm.id, 
                                                              lr.loansettingid,
                                                              lr.expectedon, 
                                                              ls.standardinterestrate, 
                                                              lr.repaymentterm, 
                                                              lp.loanamount, 
                                                              lp.tenurenumber";

                return await Connection.QueryAsync<EmployeeLoanView>(sql, new { employeeId, payrollProcessingMethodId });
            }
        }

        public async Task<IEnumerable<EmployeeLoanView>> GetAllLoanPaymentByPayrollProcessingMethodId(int payrollProcessingMethodId)
        {
            using (Connection)
            {
                var sql = @"SELECT 
                                                           lr.loantype                                   AS loantype, 
                                                           e.id                                          AS employeeid,
                                                           lr.loanamount                                 AS amount, 
                                                           Concat (e.firstname, ' ', e.lastname)         AS NAME, 
                                                           jd.employeenumber                             AS employeecode, 
                                                           lr.loanno                                     AS loanNumber, 
                                                           pm.id                                         AS payrollProcessingmethodid, 
                                                           lr.loansettingid                              AS loansettingid,
                                                           lr.expectedon                                 AS disbursementdate, 
                                                           lr.id                                         AS loanid, 
                                                           ( ( lr.loanamount + ( lr.loanamount * ls.standardinterestrate ) / 100 ) / 
                                                             lr.repaymentterm )                          AS emiamount, 
                                                           ( ( lr.loanamount + ( lr.loanamount * ls.standardinterestrate ) / 100 ) 
                                                             - ( Sum( 
                                                             COALESCE((Select lp.emiamount where lp.loanid=lr.id), 0)) ) )             AS balanceamount, 
                                                           ( lr.repaymentterm - Count((Select lp.tenurenumber where lp.loanid=lr.id)) ) AS remainingtenure 
                                                    FROM   employee e 
                                                           INNER JOIN jobdetails jd 
                                                                   ON e.id = jd.employeeid 
                                                           INNER JOIN jobfiling jf
														           ON e.id=jf.employeeid
														    INNER JOIN payrollProcessingMethod pm
                                                                   ON jf.paygroupid=pm.paygroupid AND (pm.id = @payrollProcessingMethodId 	 
                                                                                                    AND e.id NOT IN(Select ppm.employeeid from payrollprocessingmethod ppm
                                                                                                    WHERE  (pm.month = ppm.month
                                                                                                    AND pm.year = ppm.year))) 	   
                                                            LEFT JOIN loanrequest lr 
                                                                   ON e.id = lr.employeeid 
																   AND
                                                                     lr.emistartsfrommonth <= pm.month
                                                                   AND
																     lr.emistartsfromyear <= pm.year 
                                                            LEFT JOIN loanpayment lp 
                                                                  ON lr.id = lp.loanid
                                                                  AND lp.balanceamount !=0
                                                            INNER JOIN loansetting ls 
                                                                   ON ls.id = lr.loansettingid 
                                                          
                                                                      
                                                    GROUP  BY lr.loantype, 
                                                              e.id, 
                                                              lr.id, 
                                                              lr.loanamount, 
                                                              e.displayname, 
                                                              jd.employeenumber, 
                                                              lr.loanno, 
                                                              pm.id, 
                                                              lr.loansettingid, 
                                                              lr.expectedon, 
                                                              ls.standardinterestrate, 
                                                              lr.repaymentterm, 
                                                              lp.loanamount, 
                                                              lp.tenurenumber";

                return await Connection.QueryAsync<EmployeeLoanView>(sql, new { payrollProcessingMethodId });
            }
        }

        public async Task<int> InsertAsync(IEnumerable<LoanPayment> loanPayment)
        {
            using (Connection)
            {
                var sql = new QueryBuilder<LoanPayment>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");

                return await Connection.ExecuteAsync(sql, loanPayment);
            }
        }
    }
}
