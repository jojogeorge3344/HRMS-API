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
			var sql = @"SELECT OT.id AS OverTimeId,OT.normalovertime AS nothrs,0 AS hothrs,
                        0 AS sothrs,OT.employeeid,(OTS.valuevariable * escd.monthlyamount)/100 AS notrate,
                        0 hotrate,0 AS hotrate,
                        PC.id AS componentid,
                        ((OTS.valuevariable * escd.monthlyamount)/100)*OT.normalovertime AS notamount,
                        0 AS hotamount,
                        0 AS sotamount,EM.firstname AS EmployeeName,JD.employeenumber AS EmployeeCode
                        FROM hrms.overtime OT
                        INNER JOIN hrms.jobfiling jf ON jf.employeeid = OT.employeeid
                        INNER JOIN hrms.overtimepolicyconfiguration OTC ON jf.overtimepolicyid = OTC.overtimepolicyid
                        INNER JOIN hrms.payrollcomponent PC ON PC.id = OTC.normalovertime
                        INNER JOIN hrms.employeesalaryconfigurationdetails escd ON escd.payrollcomponentid = PC.id
						AND escd.employeeid = OT.employeeid
						INNER JOIN hrms.overtimeslab OTS ON OTS.overtimepolicyid = jf.overtimepolicyid
						AND OTS.overtimetype=1 AND OTS.isarchived = false
                        INNER JOIN hrms.hrmsemployee EM ON EM.id = OT.employeeid
                        INNER JOIN hrms.jobdetails JD ON JD.employeeid = OT.employeeid
                        WHERE (To_Date(cast(coalesce(OT.todate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromdate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
                        AND OT.isarchived=false AND jf.paygroupid = @payGroupId  AND OT.normalovertime>0
					    GROUP BY OT.EmployeeID,OT.Id,ots.valuevariable,
					    escd.monthlyamount,
					    pc.id,em.firstname,
					    jd.employeenumber
						
						UNION 
						
						SELECT OT.id AS OverTimeId,0 AS nothrs,OT.holidayovertime AS hothrs,
                        0 AS sothrs,OT.employeeid,0 AS notrate,
                        (OTS.valuevariable * escd1.monthlyamount)/100 AS hotrate,0 AS hotrate,
                        PC1.id AS componentid,
                        0 AS notamount,
                        ((OTS.valuevariable * escd1.monthlyamount)/100)*OT.holidayovertime AS hotamount,
                        0 AS sotamount,EM.firstname AS EmployeeName,JD.employeenumber AS EmployeeCode
                        FROM hrms.overtime OT
                        INNER JOIN hrms.jobfiling jf ON jf.employeeid = OT.employeeid
                        INNER JOIN hrms.overtimepolicyconfiguration OTC ON jf.overtimepolicyid = OTC.overtimepolicyid
                        INNER JOIN hrms.payrollcomponent PC1 ON PC1.id = OTC.holidayovertime
                        INNER JOIN hrms.employeesalaryconfigurationdetails escd1 ON escd1.payrollcomponentid = PC1.id
						AND escd1.employeeid = OT.employeeid
                        INNER JOIN hrms.overtimeslab OTS ON OTS.overtimepolicyid = jf.overtimepolicyid
						AND OTS.overtimetype=1 AND OTS.isarchived = false
                        INNER JOIN hrms.hrmsemployee EM ON EM.id = OT.employeeid
                        INNER JOIN hrms.jobdetails JD ON JD.employeeid = OT.employeeid
                        WHERE (To_Date(cast(coalesce(OT.todate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromdate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
                        AND OT.isarchived=false AND jf.paygroupid = @payGroupId AND OT.specialovertime>0
						GROUP BY OT.EmployeeID,OT.Id,ots.valuevariable,
					    escd1.monthlyamount,
					    pc1.id,em.firstname,
					    jd.employeenumber
						
						UNION
						
						SELECT OT.id AS OverTimeId,0 AS nothrs,0 AS hothrs,
                        OT.specialovertime AS sothrs,OT.employeeid,0 AS notrate,
                        0 AS hotrate,(OTS.valuevariable * escd2.monthlyamount)/100 AS hotrate,
                        PC2.id AS componentid,
                        0 AS notamount,
                        0 AS hotamount,
                        ((OTS.valuevariable * escd2.monthlyamount)/100 )*OT.specialovertime AS sotamount,
                        EM.firstname AS EmployeeName,JD.employeenumber AS EmployeeCode
                        FROM hrms.overtime OT
                        INNER JOIN hrms.jobfiling jf ON jf.employeeid = OT.employeeid
                        INNER JOIN hrms.overtimepolicyconfiguration OTC ON jf.overtimepolicyid = OTC.overtimepolicyid
                        INNER JOIN hrms.payrollcomponent PC2 ON PC2.id = OTC.specialovertime
                        INNER JOIN hrms.employeesalaryconfigurationdetails escd2 ON escd2.payrollcomponentid = PC2.id
						AND escd2.employeeid = OT.employeeid
                        INNER JOIN hrms.overtimeslab OTS ON OTS.overtimepolicyid = jf.overtimepolicyid
						AND OTS.overtimetype=1 AND OTS.isarchived = false
                        INNER JOIN hrms.hrmsemployee EM ON EM.id = OT.employeeid
                        INNER JOIN hrms.jobdetails JD ON JD.employeeid = OT.employeeid
                        WHERE (To_Date(cast(coalesce(OT.todate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromdate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
                        AND OT.isarchived=false AND jf.paygroupid = @payGroupId AND OT.specialovertime>0
						GROUP BY OT.EmployeeID,OT.Id,ots.valuevariable,
					    escd2.monthlyamount,
					    pc2.id,em.firstname,
					    jd.employeenumber";

			return await Connection.QueryAsync<OverTimePayrollViewModel>(sql, new { paygroupId, fromDate, toDate });
		}

        public async Task<int> OverTimeBulkInsert(IEnumerable<OverTime> overTimes)
        {
            var sql = new QueryBuilder<OverTime>().GenerateInsertQuery();
            sql = sql.Replace("RETURNING id", "");

            return await Connection.ExecuteAsync(sql, overTimes);
        }

        public async Task<bool> GetOverTimeDetails(string employeeNumber)
        {
            string sql = @"SELECT Count(1)
                         FROM hrms.jobdetails 
                         WHERE isarchived = false
                         AND employeenumber = @employeeNumber;";
            if ((await Connection.QueryFirstOrDefaultAsync<int>(sql, new { employeeNumber })) >= 1)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> GetOverTimeDateDetails(DateTime FromDate,int employeeId)
        {
            string sql = @"SELECT Count(1)
                         FROM hrms.overtime 
                         WHERE isarchived = false
                         AND fromdate = @FromDate
                         AND employeeid = @employeeId;";
            if ((await Connection.QueryFirstOrDefaultAsync<int>(sql, new { FromDate, employeeId })) >= 1)
            {
                return true;
            }

            return false;
        }
    }
}
