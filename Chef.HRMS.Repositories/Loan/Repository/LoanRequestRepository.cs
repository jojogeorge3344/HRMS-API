﻿using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LoanRequestRepository : GenericRepository<LoanRequest>, ILoanRequestRepository
    {
        public LoanRequestRepository(IConnectionFactory connectionFactory) : base(connectionFactory)
        {
        }

        public async Task<IEnumerable<EmployeeLoanView>> GetAllLoanByPayrollProcessingMethodId(int payrollProcessingMethodId)
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
                                                           lr.id                                         AS loanid,
                                                           lr.expectedon                                 AS disbursementdate       
                                                          
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
                                                             INNER JOIN loanrequest lr 
                                                                   ON e.id = lr.employeeid 
																   AND
                                                                    (extract(month FROM lr.expectedon) = pm.month)
                                                                   AND
																   (extract(year FROM lr.expectedon) = pm.year)
                                                           INNER JOIN loansetting ls 
                                                                   ON ls.id = lr.loansettingid 

                                                    GROUP  BY lr.loantype, 
                                                              e.id, 
                                                              lr.id, 
                                                              lr.loanamount, 
                                                              e.displayname, 
                                                              jd.employeenumber, 
                                                              lr.loanno,
                                                              lr.expectedon";

                return await Connection.QueryAsync<EmployeeLoanView>(sql, new { payrollProcessingMethodId });
            }
        }

        public async Task<IEnumerable<EmployeeLoanView>> GetAllLoanByEmployeeId(int employeeId, int payrollProcessingMethodId)
        {
            using (Connection)
            {
                var sql = @"SELECT lr.employeeid                         AS employeeid, 
                                   lr.loantype                           AS loantype, 
                                   lr.loanno                             AS loanNumber, 
                                   lr.loanamount                         AS amount, 
                                   Concat (e.firstname, ' ', e.lastname) AS NAME, 
                                   jd.employeenumber                     AS employeecode, 
                                   lr.id                                 AS loanid,
                                   lr.expectedon                         AS disbursementdate
                            FROM   loanrequest lr 
                                   INNER JOIN employee e 
                                           ON lr.employeeid = e.id 
                                   INNER JOIN jobdetails jd 
                                           ON lr.employeeid = jd.employeeid 
                                   INNER JOIN payrollprocessingmethod pm 
                                           ON 1 = 1 
                                              AND pm.id = @payrollProcessingMethodId 
                            WHERE  lr.employeeid = @employeeId 
                                   AND ( Extract(month FROM lr.expectedon) = pm.month 
                                         AND Extract(year FROM lr.expectedon) = pm.year )";

                return await Connection.QueryAsync<EmployeeLoanView>(sql, new { employeeId, payrollProcessingMethodId });
            }
        }
        public async Task<int> GetLoanLastRequestId()
        {
            using (Connection)
            {
                var sql = @"SELECT id 
                            FROM   loanrequest 
							ORDER BY id DESC
                            LIMIT  1";

                return await Connection.QueryFirstOrDefaultAsync<int>(sql);
            }
        }
    }
}