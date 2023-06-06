using Chef.Common.Core.Extensions;
using Chef.HRMS.Models.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.Report
{
    public class EmployeeDirectoryReportRepository : GenericRepository<EmployeeBasicDetailsReport>, IEmployeeDirectoryReportRepository
    {
        public EmployeeDirectoryReportRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<AddressDetailsReportView> GetAddressDetailsByEmployeeId(int employeeId)
        {
            var sql = "SELECT * FROM  hrms.address WHERE employeeId = @employeeId AND isarchived = false";

            return await Connection.QueryFirstAsync<AddressDetailsReportView>(sql, new { employeeId });
        }

        public async Task<EmployeeBasicDetailsReport> GetBasicDetailsByEmployeeId(int employeeId)
        {
            var sql = @"SELECT * FROM hrms.HRMSEmployee WHERE id = @employeeId AND isarchived = false";

            return await Connection.QueryFirstAsync<EmployeeBasicDetailsReport>(sql, new { employeeId });
        }

        public async Task<JobFillingReportView> GetJobFillingDetailsByEmployeeId(int employeeId)
        {
            var sql = @"SELECT jf.*,ls.name AS leavestructurename,s.name as shiftname,hc.name as holidaycategoryname,
                        ep.name AS expensepolicyname,ps.name AS payrollstructurename,pg.name AS paygroupname,
                        otp.name as overtimepolicyname
                        FROM hrms.jobfiling jf
                        INNER JOIN hrms.leavestructure ls
					    ON jf.leavestructureid = ls.id
                        LEFT JOIN hrms.shift s
					    ON jf.shiftid = s.id
                        LEFT JOIN hrms.holidaycategory hc
						ON hc.id = jf.holidaycategoryid
                        LEFT JOIN hrms.expensepolicy ep
						ON jf.expensepolicyid = ep.id
                        LEFT JOIN hrms.payrollstructure ps
						ON jf.payrollstructureid = ps.id
                        LEFT JOIN hrms.paygroup pg
						ON jf.paygroupid = pg.id
                        LEFT JOIN hrms.overtimepolicy otp
						ON jf.overtimepolicyid = otp.id
                        WHERE jf.employeeid = @employeeId 
                        AND jf.isarchived = false";

            return await Connection.QueryFirstAsync<JobFillingReportView>(sql, new { employeeId });
        }

        public async Task<IEnumerable<SalaryDetailsReportView>> GetSalaryDetailsByEmployeeId(int employeeId)
        {
            var sql = @"SELECT escd.monthlyamount AS amount,pc.name AS componentname
                        FROM hrms.employeesalaryconfigurationdetails escd
                        INNER JOIN hrms.payrollcomponent pc
                        ON escd.payrollcomponentid = pc.id
                        WHERE escd.employeeid = 3
                        AND escd.isarchived = false";

            return await Connection.QueryAsync<SalaryDetailsReportView>(sql, new { employeeId });
        }

        public async Task<WPSDetailsReportView> GetWPSDetailsByemployeeId(int employeeId)
        {
            var sql = @"SELECT wu.*,wg.groupname,hb.name AS bankname 
                        FROM  hrms.WPSUser wu
                        INNER JOIN hrms.wpsgroup wg
                        ON wu.groupid = wg.id
                        INNER JOIN hrms.hrmsbank hb
                        ON wu.bankid = hb.id
                        WHERE wu.employeeid = @employeeId ";

            return await Connection.QueryFirstAsync<WPSDetailsReportView>(sql, new { employeeId });
        }

        public async Task<JobDetailsReportView> GetByEmployeeId(int employeeId)
        {
            var sql = @"SELECT jd.*,jt.name AS jobtitlename,e.firstname AS reportingmanagername
                        ,c.name AS categoryname
                        FROM hrms.jobdetails jd
                        INNER JOIN hrms.jobtitle jt
                        ON jd.jobtitleid = jt.id
                        INNER JOIN hrms.hrmsemployee e
                        ON e.id = jd.reportingmanager 
                        INNER JOIN hrms.category c
                        ON jd.categoryid = c.id
                        WHERE employeeid = @employeeId";

            return await Connection.QueryFirstAsync<JobDetailsReportView>(sql, new { employeeId });
        }
    }
}
