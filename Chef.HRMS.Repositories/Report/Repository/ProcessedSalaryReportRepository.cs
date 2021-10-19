using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class ProcessedSalaryReportRepository : GenericRepository<ProcessedSalaryDetailsView>, IProcessedSalaryReportRepository
    {
        public ProcessedSalaryReportRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<ProcessedSalaryDetailsView>> GetProcessedSalaryDetails(int offSet)
        {
            using (Connection)
            {
                var sql = @$"SELECT pb.employeecode, 
                                   pb.employeename, 
                                   pg.NAME                       paygroup, 
                                   ppm.month                     payrollmonth, 
                                   ppm.year                      payrollyear, 
                                   Sum(monthlyamount)            basiccomponent, 
                                   COALESCE(ld.numberofdays, 0)  lop, 
                                   COALESCE(ld.lopamount, 0)     lopdeduction, 
                                   COALESCE(Sum(eb.amount), 0)   bonus, 
                                   COALESCE(Q1.loanoradvance, 0) loanoradvance,
                                   COALESCE(Sum(ad.amount), 0)   adhocdeduction, 
                                   COALESCE(Sum(lp.emiamount), 0)   loanrepayment
                            FROM   payrollbasiccomponent pb 
                                   INNER JOIN payrollprocessingmethod ppm 
                                           ON pb.payrollprocessingmethodid = ppm.id 
                                   INNER JOIN paygroup pg 
                                           ON pb.paygroupid = pg.id 
                                   LEFT JOIN lopdeduction ld 
                                          ON pb.employeeid = ld.employeeid 
                                   LEFT JOIN employeebonus eb 
                                          ON ppm.id = eb.payrollprocessingmethodid 
                                   LEFT JOIN adhocdeduction ad 
                                          ON ppm.id = ad.payrollprocessingmethodid 
                                   LEFT JOIN loanpayment lp 
                                          ON ppm.id = lp.payrollprocessingmethodid 
                                   LEFT JOIN (SELECT pm.id                        pid, 
                                                     Sum(COALESCE(loanamount, 0)) loanoradvance 
                                              FROM   loanrequest lr 
                                                     INNER JOIN payrollprocessingmethod pm 
                                                             ON 1 = 1 
                                              WHERE  (( Extract(month FROM expectedon) = pm.month )) 
                                                     AND ( Extract(year FROM expectedon) = pm.year ) 
                                              GROUP  BY lr.employeeid, 
                                                        pm.id) Q1 
                                          ON pb.payrollprocessingmethodid = Q1.pid 
                            GROUP  BY pb.employeeid, 
                                      pb.employeecode, 
                                      pb.employeename, 
                                      pg.NAME, 
                                      ppm.month, 
                                      ppm.year, 
                                      ld.numberofdays, 
                                      ld.lopamount, 
                                      Q1.loanoradvance 
                            ORDER  BY pb.employeeid  
                            OFFSET {offSet} LIMIT 10";

                return await Connection.QueryAsync<ProcessedSalaryDetailsView>(sql);
            }
        }
    }
}
