using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class OverTimeRepository : GenericRepository<OverTime>, IOverTimeRepository
    {
        public OverTimeRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session) : base(httpContextAccessor, session)
        {
        }

        public async Task<IEnumerable<OverTime>> GetAllOvertimeDetailsById(int employeeId)
        {
            //var sql = "SELECT * FROM hrms.overtime WHERE employeeid=@Id and isarchived = false order by id desc";
            var sql = " SELECT e.firstname as EmployeeName,o.* " +
                      " FROM hrms.overtime as o " +
                      " JOIN hrms.hrmsemployee  as e on  o.employeeid=e.id" +
                      " WHERE o.employeeid=@Id and o.isarchived = false order by id desc";
                return await Connection.QueryAsync<OverTime>(sql, new { Id = employeeId });
        }
        public async Task<int> GetAssignedOverTimePolicy(int employeeId)
        {
                var sql = @"SELECT DISTINCT overtimepolicyid 
                                    FROM hrms.jobfiling
                                    WHERE employeeid=@employeeId
                                    ORDER  BY overtimepolicyid ASC";

                return await Connection.QueryFirstOrDefaultAsync<int>(sql, new { employeeId });
        }

        public async Task<IEnumerable<CalenderView>> GetCalenderDetails(int employeeId)
        {
            var sql = @"SELECT jf.*,s.breakduration,s.name AS shiftname,
                        s.numberofdays,s.starttime AS shiftstarttime,
                        s.endtime AS shiftendtime,hc.name AS holidaycategoryname,
                        h.description AS holidaydescription,h.date AS holidaydate,
                        h.name AS holidayname,otp.name AS overtimepolicycode,
                        otp.description AS overtimepolicyname
                        FROM hrms.jobfiling jf
                        INNER JOIN hrms.shift s
                        ON jf.shiftid = s.id
                        INNER JOIN hrms.holidaycategory hc
                        ON hc.id = jf.holidaycategoryid
                        INNER JOIN hrms.overtimepolicy otp
                        ON otp.id = jf.overtimepolicyid
                        LEFT JOIN hrms.holiday h
                        ON h.holidaycategoryid = hc.id
                        WHERE jf.employeeid = @employeeId
                        AND jf.isarchived = false";

            return await Connection.QueryAsync<CalenderView>(sql, new { employeeId });
        }

        public async Task<IEnumerable<OvertimeViewModel>> GetOvertimeNotifyPersonnelByOvertimeId(int overtimeId)
        {
            var sql = @"SELECT  
                                op.id,
		                        op.overtimeid,
		                        op.notifypersonnel,
		                        ee.firstname
                         FROM hrms.overtimenotifypersonnel AS op
                         INNER JOIN hrms.overtime AS ot
                         ON op.overtimeid = ot.id
                         INNER JOIN hrms.HRMSEmployee AS ee 
                         ON op.notifypersonnel = ee.id
                         WHERE overtimeId = @overtimeId
                         AND op.isarchived = false";

            return await Connection.QueryAsync<OvertimeViewModel>(sql, new { overtimeId });
        }

      

        public async Task<int> InsertNotifyPersonnel(IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel)
        {
                var sql = new QueryBuilder<OverTimeNotifyPersonnel>().GenerateInsertQuery();
                sql = sql.Replace("RETURNING id", "");
                return await Connection.ExecuteAsync(sql, overTimeNotifyPersonnel);
        }

        public async Task<int> UpdateNotifyPersonnel(IEnumerable<OverTimeNotifyPersonnel> overTimeNotifyPersonnel)
        {
            var sql = new QueryBuilder<OverTimeNotifyPersonnel>().GenerateUpdateQuery();
            return await Connection.ExecuteAsync(sql, overTimeNotifyPersonnel);
        }

        public async Task<IEnumerable<OverTime>> GetAllAsync()
        {
            var sql = @"SELECT ot.*,jd.employeenumber FROM hrms.overtime ot
                        INNER JOIN hrms.jobdetails jd
                        ON ot.employeeid = jd.employeeid
                        WHERE ot.isarchived = false";
                         
            return await Connection.QueryAsync<OverTime>(sql); 
        }

		public async Task<IEnumerable<OverTimePayrollViewModel>> GetOvertimeByPaygroupId(int paygroupId,string fromDate,string toDate)
		{
			var sql = @"SELECT OT.normalovertime AS nothrs,0 AS hothrs,
                        0 AS sothrs,OT.employeeid,(OTS.valuevariable * escd.monthlyamount)/100 AS notrate,
                        0 hotrate,0 AS hotrate,
                        PC.id AS componentid,
                        ((OTS.valuevariable * escd.monthlyamount)/100)*OT.normalovertime AS notamount,
                        0 AS hotamount,
                        0 AS sotamount
                        FROM hrms.overtime OT
                        INNER JOIN hrms.jobfiling jf ON jf.employeeid = OT.employeeid
                        INNER JOIN hrms.overtimepolicyconfiguration OTC ON jf.overtimepolicyid = OTC.overtimepolicyid
                        LEFT JOIN hrms.payrollcomponent PC ON PC.id = OTC.normalovertime
                        INNER JOIN hrms.employeesalaryconfigurationdetails escd ON escd.payrollcomponentid = PC.id
						INNER JOIN hrms.overtimeslab OTS ON OTS.overtimepolicyid = jf.overtimepolicyid
                        WHERE (To_Date(cast(coalesce(OT.fromdate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromdate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
                        AND  (To_Date(cast(coalesce(OT.todate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromdate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
                        AND OT.isarchived=false AND jf.paygroupid = @payGroupId
						
						UNION 
						
						SELECT 0 AS nothrs,OT.holidayovertime AS hothrs,
                        0 AS sothrs,OT.employeeid,0 AS notrate,
                        (OTS.valuevariable * escd1.monthlyamount)/100 AS hotrate,0 AS hotrate,
                        PC1.id AS componentid,
                        0 AS notamount,
                        ((OTS.valuevariable * escd1.monthlyamount)/100)*OT.holidayovertime AS hotamount,
                        0 AS sotamount
                        FROM hrms.overtime OT
                        INNER JOIN hrms.jobfiling jf ON jf.employeeid = OT.employeeid
                        INNER JOIN hrms.overtimepolicyconfiguration OTC ON jf.overtimepolicyid = OTC.overtimepolicyid
                        LEFT JOIN hrms.payrollcomponent PC1 ON PC1.id = OTC.holidayovertime
                        INNER JOIN hrms.employeesalaryconfigurationdetails escd1 ON escd1.payrollcomponentid = PC1.id
                        INNER JOIN hrms.overtimeslab OTS ON OTS.overtimepolicyid = jf.overtimepolicyid
                        WHERE (To_Date(cast(coalesce(OT.fromdate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromdate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
                        AND  (To_Date(cast(coalesce(OT.todate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromdate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
                        AND OT.isarchived=false AND jf.paygroupid = @payGroupId
						
						UNION
						
						SELECT 0 AS nothrs,0 AS hothrs,
                        OT.specialovertime AS sothrs,OT.employeeid,0 AS notrate,
                        0 AS hotrate,(OTS.valuevariable * escd2.monthlyamount)/100 AS hotrate,
                        PC2.id AS componentid,
                        0 AS notamount,
                        0 AS hotamount,
                        ((OTS.valuevariable * escd2.monthlyamount)/100 )*OT.specialovertime AS sotamount
                        FROM hrms.overtime OT
                        INNER JOIN hrms.jobfiling jf ON jf.employeeid = OT.employeeid
                        INNER JOIN hrms.overtimepolicyconfiguration OTC ON jf.overtimepolicyid = OTC.overtimepolicyid
                        LEFT JOIN hrms.payrollcomponent PC2 ON PC2.id = OTC.specialovertime
                        INNER JOIN hrms.employeesalaryconfigurationdetails escd2 ON escd2.payrollcomponentid = PC2.id
                        INNER JOIN hrms.overtimeslab OTS ON OTS.overtimepolicyid = jf.overtimepolicyid
                        WHERE (To_Date(cast(coalesce(OT.fromdate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromdate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
                        AND  (To_Date(cast(coalesce(OT.todate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromdate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
                        AND OT.isarchived=false AND jf.paygroupid = @payGroupId";

			return await Connection.QueryAsync<OverTimePayrollViewModel>(sql, new { paygroupId, fromDate, toDate });
		}
	}
}
