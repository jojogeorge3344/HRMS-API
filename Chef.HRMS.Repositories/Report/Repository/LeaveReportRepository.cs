using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class LeaveReportRepository : GenericRepository<LeaveReportView>, ILeaveReportRepository
    {
        public LeaveReportRepository(DbSession session) : base(session)
        {
        }

        public async Task<IEnumerable<LeaveReportView>> GetLeaveReportDetails(int offSet)
        {
            using (Connection)
            {
                var sql = @$"SELECT l.employeeid, 
                                   ( Concat(e.firstname, ' ', e.lastname) )   employeename, 
                                   jd.employeenumber                          employeecode, 
                                   jd.department, 
                                   l.fromdate :: DATE, 
                                   l.todate :: DATE, 
                                   l.numberofdays, 
                                   lc.description                             leavetype, 
                                   l.createddate appliedon, 
                                   ( Concat(em.firstname, ' ', em.lastname) ) approvedby, 
                                   l.approveddate :: DATE                     approvedon 
                            FROM   hrms.leave l 
                                   inner join hrms.jobdetails jd 
                                           ON l.employeeid = jd.employeeid 
                                   inner join hrms.leavecomponent lc 
                                           ON l.leavecomponentid = lc.id 
                                   inner join hrms.employee e 
                                           ON l.employeeid = e.id 
                                   inner join hrms.employee em 
                                           ON l.approvedby = em.id 
                            ORDER BY   l.employeeid offset {offSet} limit 10";

                return await Connection.QueryAsync<LeaveReportView>(sql);
            }
        }
    }
}
