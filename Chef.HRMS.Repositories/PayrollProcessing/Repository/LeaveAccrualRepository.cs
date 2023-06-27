using Chef.Common.Models;
using Chef.HRMS.Models.PayrollProcessing;
using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Chef.HRMS.Repositories.PayrollProcessing.Repository
{
    public class LeaveAccrualRepository : TenantRepository<LeaveAccrual>, ILeaveAccrualRepository
    {
        public LeaveAccrualRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<LeaveAccrual>> GetProcessedLeaveAccruals(DateTime accrualDate)
        {
            var sql = @"select * from hrms.leaveaccrual where leaveaccrual.accrualstatus = 1 and accrualdate = @accrualDate";
            return await Connection.QueryAsync<LeaveAccrual>(sql, new {accrualDate });
        }

        public async Task<IEnumerable<LeaveAccrual>> GetLeaveAccrualsByPayrollProcessingId(int payrollProcessingId)
        {
            var sql = @"SELECT
                          la.accrualdays,
                          la.accrualamount,
                          la.accrualdate,
                          la.employeeid,
                          emp.displayname AS employeename,
                          jd.employeenumber AS employeecode
                        FROM hrms.leaveaccrual la
                        LEFT JOIN hrms.hrmsemployee emp
                          ON emp.id = la.employeeid
                        LEFT JOIN hrms.jobdetails jd
                          ON jd.employeeid = emp.id
                        WHERE la.payrollprocessingid = @payrollProcessingId";

            return await Connection.QueryAsync<LeaveAccrual>(sql, new { payrollProcessingId });
        }

        public async Task<IEnumerable<AccrualsPrintViewModel>> GetAccrualsByPayrollProcessingId(int payrollProcessingId)
        {
            var sql = @"select la.accrualdays as leaveaccrualdays, la.accrualamount as leaveaccrualamount,
                                eosa.accrualdays as eosaccrualdays, eosa.accrualamount as eosaccrualamount,
                                0 as ticketaccrualdays, ta.accrualamount as ticketaccrualamount,
                                emp.id as employeeid, emp.displayname as employeename, jd.employeenumber as employeecode
                                from hrms.eosaccrual eosa 
						        left join hrms.ticketaccrual ta on eosa.employeeid = ta.employeeid
						        left join hrms.leaveaccrual la on ta.employeeid = la.employeeid
                                left join hrms.jobfiling jf on jf.employeeid = eosa.employeeid
                                left join hrms.jobdetails jd on jd.employeeid = jf.employeeid
                                left join hrms.hrmsemployee emp on emp.id = jf.employeeid
                                where eosa.payrollprocessingid = @payrollProcessingId 
                                and ta.payrollprocessingid = @payrollProcessingId
                                and la.payrollprocessingid = @payrollProcessingId";

            return await Connection.QueryAsync<AccrualsPrintViewModel>(sql, new { payrollProcessingId });
        }


    }
}
