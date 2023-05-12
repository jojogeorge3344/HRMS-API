using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories.Report
{
    public class PayslipReportRepository : GenericRepository<PayrollComponentDetails>, IPayslipReportRepository
    {
        public PayslipReportRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<PayrollComponentReportView>> EmployeeComponentDetails(int employeeId, DateTime fromDate, DateTime ToDate)
        {
            var sql = @"select pc.shortcode,pc.name,pcd.payrollcomponentid,pcd.earningsamt,pcd.deductionamt,
                        pc.payheadbaseunittype,pc.minimumlimit,pc.maximumlimit,pcd.payrollprocessdate
                        FROM hrms.payrollcomponentdetails pcd
                        INNER JOIN hrms.payrollcomponent pc
                        ON pcd.payrollcomponentid = pc.id
                        WHERE pcd.payrollprocessdate BETWEEN @fromDate AND @ToDate
                         AND pcd.employeeid = @employeeId 
                        AND pcd.isarchived = false";

            return await Connection.QueryAsync<PayrollComponentReportView>(sql, new { employeeId, fromDate, ToDate });

        }

        public async Task<IEnumerable<PayrollHeaderView>> EmployeeHeaderDetails(int employeeId, DateTime fromDate, DateTime ToDate)
        {
            var sql = @"SELECT e.firstname,e.middlename,e.lastname,jd.employeenumber AS employeecode,a.currentcountry AS countryid,
                        c.name AS countryname,pcd.payrollprocessdate FROM hrms.payrollcomponentdetails pcd
                        INNER JOIN hrms.hrmsemployee e
                        ON pcd.employeeid = e.id
                        INNER JOIN hrms.jobdetails jd
                        ON e.id = jd.employeeid
                        INNER JOIN hrms.address a
                        ON a.employeeid = e.id
                        INNER JOIN hrms.country c
                        ON c.id = a.currentcountry
                        WHERE pcd.id = @employeeId
                        AND pcd.payrollprocessdate BETWEEN @fromDate AND @ToDate
                        AND pcd.isarchived = false";

            return await Connection.QueryAsync<PayrollHeaderView>(sql, new { employeeId, fromDate, ToDate });
        }

        public async Task<IEnumerable<LoanDetailsReportView>> EmployeeLoanDetails(int employeeId, DateTime fromDate, DateTime ToDate)
        {
            var sql = @"SELECT lr.loanamount,lrd.repaymentamount FROM hrms.payrollcomponentdetails pcd
                        INNER JOIN hrms.loanrequest lr
                        ON lr.employeeid = pcd.employeeid
                        INNER JOIN hrms.loanrequestdetail lrd
                        ON lr.id = lrd.loanrequestid
                        WHERE pcd.employeeid = @employeeId
                        AND pcd.payrollprocessdate BETWEEN @fromDate AND @ToDate
                        AND pcd.isarchived = false";

            return await Connection.QueryAsync<LoanDetailsReportView>(sql, new { employeeId, fromDate, ToDate });

        }

        public async Task<IEnumerable<OvertimeDetailReportView>> EmployeeOverTimeDetails(int employeeId, DateTime fromDate, DateTime ToDate)
        {
            var sql = @"SELECT OT.normalovertime AS normalovertimehrs,OT.holidayovertime AS holidayovertimehrs,
                        OT.specialovertime AS specialovertimehrs,OT.employeeid,(OTS.valuevariable * escd.monthlyamount)/100 AS normalovertimerate,
                        (OTS.valuevariable * escd1.monthlyamount)/100 AS holidayovertimerate,(OTS.valuevariable * escd2.monthlyamount)/100 AS specialovertimerate,
                        --PC.id AS normalcomponentid,PC1.id AS holidaycomponentid,PC2.id AS specialcomponentid,
                        ((OTS.valuevariable * escd.monthlyamount)/100)*OT.normalovertime AS normalovertimeamount,
                        ((OTS.valuevariable * escd1.monthlyamount)/100)*OT.holidayovertime AS holidayovertimeamount,
                        ((OTS.valuevariable * escd2.monthlyamount)/100 )*OT.specialovertime AS specialovertimeamount,
						PC.name AS normalovertimename,PC1.name AS holidayovertimename,PC2.name AS specialovertimename
                        FROM hrms.overtime OT
                        INNER JOIN hrms.jobfiling jf ON jf.employeeid = OT.employeeid
                        INNER JOIN hrms.overtimepolicyconfiguration OTC ON jf.overtimepolicyid = OTC.overtimepolicyid
                        LEFT JOIN hrms.payrollcomponent PC ON PC.id = OTC.normalovertime
                        INNER JOIN hrms.employeesalaryconfigurationdetails escd ON escd.payrollcomponentid = PC.id
                        LEFT JOIN hrms.payrollcomponent PC1 ON PC1.id = OTC.holidayovertime
                        INNER JOIN hrms.employeesalaryconfigurationdetails escd1 ON escd1.payrollcomponentid = PC1.id
                        LEFT JOIN hrms.payrollcomponent PC2 ON PC2.id = OTC.specialovertime
                        INNER JOIN hrms.employeesalaryconfigurationdetails escd2 ON escd2.payrollcomponentid = PC2.id
                        INNER JOIN hrms.overtimeslab OTS ON OTS.overtimepolicyid = jf.overtimepolicyid
                        WHERE (To_Date(cast(coalesce(OT.fromdate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromDate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
                        AND  (To_Date(cast(coalesce(OT.todate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromDate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
                        AND OT.isarchived=false";

            return await Connection.QueryAsync<OvertimeDetailReportView>(sql, new { employeeId, fromDate, ToDate });
        }
    }
}
