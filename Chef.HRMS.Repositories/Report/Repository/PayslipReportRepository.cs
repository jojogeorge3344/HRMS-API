namespace Chef.HRMS.Repositories.Report;

public class PayslipReportRepository : GenericRepository<PayrollComponentDetails>, IPayslipReportRepository
{
    public PayslipReportRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
    {
    }

    public async Task<IEnumerable<PayrollHeaderView>> EmployeeHeaderDetails(string employeeIds, DateTime fromDate, DateTime ToDate, string paygroupIds, string departmentIds, string designationIds)
    {
        var sql = @"SELECT e.id AS employeeid,e.firstname,e.middlename,e.lastname,jd.employeenumber AS employeecode,pcd.payrollcomponentid
                        ,pcd.earningsamt,pcd.deductionamt,pcd.payrollprocessdate,jf.paygroupid,pg.currencyid,pg,currencycode,a.currentcountry
                         FROM hrms.hrmsemployee e
                         LEFT JOIN hrms.jobdetails jd
                         ON e.id = jd.employeeid
                         LEFT JOIN hrms.jobfiling jf
                         ON e.id = jf.employeeid
                         LEFT JOIN hrms.paygroup pg
						 ON jf.paygroupid = pg.id
                         LEFT JOIN hrms.address a
	                     ON e.id = a.employeeid
                         LEFT JOIN hrms.payrollcomponentdetails pcd
                         ON pcd.employeeid = e.id
                         WHERE (To_Date(cast(coalesce(pcd.payrollprocessdate) as TEXT),'YYYY MM DD') BETWEEN @fromDate AND @ToDate)";
        if (!string.IsNullOrEmpty(paygroupIds) && paygroupIds != "0")
        {
            sql += "AND jf.paygroupid IN (" + paygroupIds + ")";
        }
        if (!string.IsNullOrEmpty(departmentIds) && departmentIds != "0")
        {
            sql += "AND jd.department IN (" + departmentIds + ")";
        }
        if (!string.IsNullOrEmpty(designationIds) && designationIds != "0")
        {
            sql += "AND jd.jobtitleid IN (" + designationIds + ")";
        }
        if (!string.IsNullOrEmpty(employeeIds) && employeeIds != "0")
        {
            sql += "AND e.id IN (" + employeeIds + ")";
        }
        sql += @"AND e.isarchived = false
                         GROUP BY e.id,e.firstname,e.middlename,e.lastname,jd.employeenumber,pcd.payrollcomponentid,
                         pcd.earningsamt,pcd.deductionamt,pcd.payrollprocessdate,jf.paygroupid,pg.currencyid,pg,currencycode,a.currentcountry";

        return await Connection.QueryAsync<PayrollHeaderView>(sql, new { employeeIds, fromDate, ToDate, paygroupIds, departmentIds, designationIds });
    }

    public async Task<IEnumerable<PayrollComponentReportView>> EmployeeComponentDetails(string employeeIds, DateTime fromDate, DateTime ToDate, string paygroupIds, string departmentIds, string designationIds)
    {
        var sql = @"select pc.shortcode,pc.name,pcd.payrollcomponentid,pcd.earningsamt,pcd.deductionamt,
                        pc.payheadbaseunittype,pc.minimumlimit,pc.maximumlimit,pcd.payrollprocessdate,pcd.employeeid
                        FROM hrms.payrollcomponentdetails pcd
                        INNER JOIN hrms.payrollcomponent pc
                        ON pcd.payrollcomponentid = pc.id
                        INNER JOIN hrms.jobdetails jd
                        ON pcd.employeeid = jd.employeeid
                        INNER JOIN hrms.jobfiling jf
                        ON pcd.employeeid = jf.employeeid
                        WHERE pcd.payrollprocessdate BETWEEN @fromDate AND @ToDate
                        AND pcd.employeeid IN (" + employeeIds + @")";
        if (paygroupIds != string.Empty)
        {
            sql += "AND jf.paygroupid IN (" + paygroupIds + ")";
        }
        if (departmentIds != string.Empty)
        {
            sql += "AND jd.department IN (" + departmentIds + ")";
        }
        if (designationIds != string.Empty)
        {
            sql += "AND jd.jobtitleid IN (" + designationIds + ")";
        }
        sql += @"AND pcd.isarchived = false
                        GROUP BY pc.shortcode,pc.name,pcd.payrollcomponentid,pcd.earningsamt,pcd.deductionamt,
                        pc.payheadbaseunittype,pc.minimumlimit,pc.maximumlimit,pcd.payrollprocessdate,pcd.employeeid";

        return await Connection.QueryAsync<PayrollComponentReportView>(sql, new { employeeIds, fromDate, ToDate, paygroupIds, departmentIds, designationIds });

    }

    public async Task<IEnumerable<LoanDetailsReportView>> EmployeeLoanDetails(string employeeIds, DateTime fromDate, DateTime ToDate)
    {
        var sql = @"SELECT lr.loanamount,lrd.repaymentamount FROM hrms.payrollcomponentdetails pcd
                        INNER JOIN hrms.loanrequest lr
                        ON lr.employeeid = pcd.employeeid
                        INNER JOIN hrms.loanrequestdetail lrd
                        ON lr.id = lrd.loanrequestid
                        WHERE pcd.employeeid IN (" + employeeIds + @") 
                        AND (To_Date(cast(coalesce(pcd.payrollprocessdate) as TEXT),'YYYY MM DD') BETWEEN @fromDate AND @ToDate)
                        AND pcd.isarchived = false";

        return await Connection.QueryAsync<LoanDetailsReportView>(sql, new { employeeIds, fromDate, ToDate });

    }

    public async Task<IEnumerable<OvertimeDetailReportView>> EmployeeOverTimeDetails(string employeeIds, DateTime fromDate, DateTime ToDate)
    {
        var sql = @"SELECT OT.normalovertime AS normalovertimehrs,OT.holidayovertime AS holidayovertimehrs,
                        OT.specialovertime AS specialovertimehrs,OT.employeeid,(OTS.valuevariable * escd.monthlyamount)/100 AS normalovertimerate,
                        (OTS.valuevariable * escd1.monthlyamount)/100 AS holidayovertimerate,(OTS.valuevariable * escd2.monthlyamount)/100 AS specialovertimerate,
                        --PC.id AS normalcomponentid,PC1.id AS holidaycomponentid,PC2.id AS specialcomponentid,
                        ((OTS.valuevariable * escd.monthlyamount)/100)*OT.normalovertime AS normalovertimeamount,
                        ((OTS.valuevariable * escd1.monthlyamount)/100)*OT.holidayovertime AS holidayovertimeamount,
                        ((OTS.valuevariable * escd2.monthlyamount)/100 )*OT.specialovertime AS specialovertimeamount,
						PC.name AS normalovertimename,PC1.name AS holidayovertimename,PC2.name AS specialovertimename,jf.employeeid
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
                        AND jf.employeeid IN (" + employeeIds + @") 
                        AND OT.isarchived=false";

        return await Connection.QueryAsync<OvertimeDetailReportView>(sql, new { employeeIds, fromDate, ToDate });
    }
}
