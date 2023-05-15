﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LoanPrintBoldReportRepository : BaseRepository, ILoanPrintBoldReportRepository
    {
        public async Task<IEnumerable<LoanPrintBoldReport>> GetLoanDetailsAsync(int id)
        {
            string query = string.Format(@"SELECT (Concat(e.firstname, ' ', e.lastname)) AS NAME,lr.loanno,lr.emistartsfromyear,lr.emistartsfrommonth,
                                           lr.loanamount,lr.comments,lr.loantype AS LoanType,
                                           ld.year AS Year,ld.month AS Months,ld.repaymentamount AS RepaymentAmount ,ld.status
                                           FROM   hrms.loanrequest lr 
                                           LEFT JOIN hrms.HRMSEmployee e ON lr.employeeid = e.id 
                                           LEFT JOIN hrms.loanrequestdetail ld ON ld.loanrequestid=lr.id WHERE lr.id={0}", id);
           
            var result = await DatabaseSession.QueryAsync<LoanPrintBoldReport>(query);
            return result;
        }
    }
}