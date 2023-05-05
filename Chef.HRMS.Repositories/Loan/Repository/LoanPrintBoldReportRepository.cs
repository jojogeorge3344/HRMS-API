using System;
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
            string query = string.Format(@"SELECT lr.loano,Concat (e.firstname, ' ', e.lastname) AS NAME,lr.emistartsfromyear,,lr.emistartsfrommonth,
                                           lr.loanamount,lr.comments,lr.loantypeAS LoanType,
                                           ld.year,ld.month,ld.repaymentamount,ld.status
                                           FROM   hrms.loanrequest lr 
                                           LEFT JOIN hrms.HRMSEmployee e ON lr.employeeid = e.id 
                                          LEFT JOIN hrms.hrms.loanrequestdetail ld ON ld.loanrequestid=lr.id
                                        WHERE loanrequest.id = {0}; "", id);");
            var result = await DatabaseSession.QueryAsync<LoanPrintBoldReport>(query);
            return result;
        }
    }
}