using AutoMapper.Configuration.Annotations;
using Chef.HRMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Repositories
{
    public class SystemVariableValuesRepository : GenericRepository<SystemVariableValues>, ISystemVariableValuesRepository
    {
        private readonly IBulkUploadRepository bulkUploadRepository;
		private readonly IPayrollProcessingMethodRepository payrollProcessingMethodRepository;
		private readonly IPayGroupRepository payGroupRepository;

		public SystemVariableValuesRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session, IBulkUploadRepository bulkUploadRepository,
			IPayrollProcessingMethodRepository payrollProcessingMethodRepository,
			IPayGroupRepository payGroupRepository) : base(httpContextAccessor, session)
        {
            this.bulkUploadRepository = bulkUploadRepository;
            this.payrollProcessingMethodRepository = payrollProcessingMethodRepository;
			this.payGroupRepository = payGroupRepository;
		}

		public async Task<IEnumerable<SystemVariableValues>> GetSystemVariableValuesByEmployeeId(int employeeId)
		{
			DateTime nextMonth = DateTime.Now.AddMonths(1);
			int month = nextMonth.Month;
			int year = nextMonth.Year;
            var sql = @"select sv.code,svv.transvalue from hrms.systemvariable sv
						join hrms.systemvariablevalues svv 
						on sv.id = svv.systemvariableid
					    where  svv.employeeid = @employeeId
						and EXTRACT(MONTH FROM svv.transdate) = @month AND EXTRACT(YEAR FROM svv.transdate) = @year";
            //sv.code = 'Wkg_Dys_Cldr_Mth'or sv.code = 'Wkd_Dys_Cldr_Mth'  and
            return await Connection.QueryAsync<SystemVariableValues>(sql, new { employeeId, month, year });
        }
        public async Task<string> InsertSystemVariableDetails(int PayGroupId, int ppMId)//, PayrollProcessingMethod systemVariableValues)
        {
			var processingMethod = await payrollProcessingMethodRepository.GetAsync(ppMId);
			int intMonth = processingMethod.Month;
			var payGroupDet = await payGroupRepository.GetAsync(PayGroupId);

			int intYear = processingMethod.Year;
			int intleaveCutoff = Convert.ToInt32(payGroupDet.LeaveCutOff);
			DateTime leaveStartDate = new DateTime(intYear, intMonth - 1, intleaveCutoff);
			DateTime leaveEndDate = new DateTime(intYear, intMonth , intleaveCutoff);


			int intTimeSheetCutOff = Convert.ToInt32(payGroupDet.TimeSheetCutOff);
			DateTime timeSheetStartDate = new DateTime(intYear, intMonth - 1, intTimeSheetCutOff);
			DateTime timeSheetEndDate = new DateTime(intYear, intMonth, intTimeSheetCutOff);

			DateTime monthStart = new DateTime(intYear, intMonth, 1);
			DateTime monthEnd = monthStart.AddMonths(1);
			var varMonthDays = (monthEnd - monthStart);
			int calMonthDays = varMonthDays.Days;

			DateTime yearStart = new DateTime(intYear, 1, 1);
			DateTime yearEnd = yearStart.AddYears(1);

			//LOP
			#region lop
			var sql = @"SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Lop_Dys_Btw_Dte' AND isarchived=false LIMIT 1)
						AS systemvariableid , ld.employeeid AS employeeid,
						COUNT(ld.leavedate) AS transvalue
						FROM hrms.leave l
						LEFT JOIN hrms.leavecomponent lc ON l.leavecomponentid=lc.id
						LEFT JOIN hrms.leavedetails ld ON l.id = ld.leaveid
						WHERE  lc.isunpaidleave=true AND l.isarchived=false AND lc.isarchived=false AND l.employeeid 
						IN
						(
							SELECT hm.id FROM hrms.hrmsemployee hm
							LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
							LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
							WHERE pg.id=@PayGroupId AND hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
						)
						AND To_date(Cast(ld.leavedate AS TEXT), 'YYYY-MM-DD') BETWEEN @leaveStartDate AND @leaveEndDate
						GROUP BY ld.employeeid;";

            var Lop_Dys_Btw_Dte = await Connection.QueryAsync<SystemVariableDto>(sql, new { PayGroupId,leaveStartDate,leaveEndDate
			});
            List<SystemVariableValues> systemVariableValues = Lop_Dys_Btw_Dte.Select(x => new SystemVariableValues()
            {
                SystemVariableId = x.SystemVariableId,
                TransValue = x.TransValue,
                EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
            var dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues);
			#endregion

			//OT
			#region OT
			sql = @"SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Hd_Ot' AND isarchived=false LIMIT 1)
						AS systemvariableid , OT.employeeid AS employeeid,
						SUM(OT.holidayovertime) AS transvalue
						FROM hrms.overtime OT
						WHERE  OT.requeststatus=1  AND OT.employeeid 
						IN
						(
							SELECT hm.id FROM hrms.hrmsemployee hm
							LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
							LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
							WHERE pg.id=@PayGroupId AND 
							hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
						)
						AND To_date(Cast(OT.todate AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetStartDate AND @timeSheetEndDate
						GROUP BY OT.employeeid

					UNION

					SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Sp_Ot' AND isarchived=false LIMIT 1)
						AS systemvariableid , OT.employeeid AS employeeid,
						SUM(OT.specialovertime) AS transvalue
						FROM hrms.overtime OT
						WHERE  OT.requeststatus=1  AND OT.employeeid 
						IN
						(
							SELECT hm.id FROM hrms.hrmsemployee hm
							LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
							LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
							WHERE pg.id=@PayGroupId AND 
							hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
						)
						AND To_date(Cast(OT.todate AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetStartDate AND @timeSheetEndDate
						GROUP BY OT.employeeid

					UNION
						
					SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Nml_Ot_Cldr_Mth' AND isarchived=false LIMIT 1)
						AS systemvariableid , OT.employeeid AS employeeid,
						SUM(OT.normalovertime) AS transvalue
						FROM hrms.overtime OT
						WHERE  OT.requeststatus=1  AND OT.employeeid 
						IN
						(
							SELECT hm.id FROM hrms.hrmsemployee hm
							LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
							LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
							WHERE pg.id=@PayGroupId AND 
							hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
						)
						AND To_date(Cast(OT.todate AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetStartDate AND @timeSheetEndDate
						GROUP BY OT.employeeid";

			var Ot = await Connection.QueryAsync<SystemVariableDto>(sql, new { PayGroupId, timeSheetStartDate, timeSheetEndDate
			});
			List<SystemVariableValues> systemVariableValues_ot = Ot.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_ot);
			#endregion

			//Wkg_Dys_Cldr_Mth
			#region Wkg_Dys_Cldr_Mth
			

			sql = @"SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Wkg_Dys_Cldr_Mth' AND isarchived=false LIMIT 1)
						AS systemvariableid , JF.employeeid AS employeeid,
						(@calMonthDays -Count(HM.date)) AS transvalue
						FROM hrms.holiday HM
						LEFT JOIN hrms.Jobfiling JF ON JF.holidaycategoryid = HM.holidaycategoryid
						WHERE  JF.isarchived = false AND HM.isarchived = false   AND JF.employeeid 
						IN
						(
							SELECT hm.id FROM hrms.hrmsemployee hm
							LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
							LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
							WHERE pg.id=@PayGroupId AND 
							hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
						)
						AND To_date(Cast(HM.date AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetStartDate AND @timeSheetEndDate
						GROUP BY JF.employeeid";

			var Wkg_Dys_Cldr_Mth = await Connection.QueryAsync<SystemVariableDto>(sql, new { PayGroupId, timeSheetStartDate,
				timeSheetEndDate, calMonthDays
			});
			List<SystemVariableValues> systemVariableValues_Wkg_days = Wkg_Dys_Cldr_Mth.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_Wkg_days);
			#endregion

			//Worked days
			sql = @"SELECT
			(SELECT id FROM hrms.systemvariable WHERE code='Wkd_Dys_Cldr_Mth' AND isarchived=false LIMIT 1)
			AS systemvariableid , JF.employeeid AS employeeid,
			(@calMonthDays -Count(HM.date) - (SELECT 
			COUNT(ld.leavedate) 
			FROM hrms.leave l
			LEFT JOIN hrms.leavecomponent lc ON l.leavecomponentid=lc.id
			LEFT JOIN hrms.leavedetails ld ON l.id = ld.leaveid
			WHERE  lc.isunpaidleave=true AND l.isarchived=false AND lc.isarchived=false AND l.employeeid = JF.employeeid 
			AND To_date(Cast(ld.leavedate AS TEXT), 'YYYY-MM-DD') BETWEEN @leaveStartDate AND @leaveEndDate )) AS transvalue
			FROM hrms.holiday HM
			LEFT JOIN hrms.Jobfiling JF ON JF.holidaycategoryid = HM.holidaycategoryid
			WHERE  JF.isarchived = false AND HM.isarchived = false   AND JF.employeeid 
			IN
			(
				SELECT hm.id FROM hrms.hrmsemployee hm
				LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
				LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
				WHERE pg.id=@PayGroupId AND 
				hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
			)
			AND To_date(Cast(HM.date AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetStartDate AND @timeSheetEndDate
			GROUP BY JF.employeeid";

			var Wkd_Dys_Cldr_Mth = await Connection.QueryAsync<SystemVariableDto>(sql, new
			{
				PayGroupId,
				timeSheetStartDate,
				timeSheetEndDate,
				calMonthDays,
				leaveStartDate,
				leaveEndDate
			});
			List<SystemVariableValues> systemVariableValues_Wkd_days = Wkd_Dys_Cldr_Mth.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_Wkd_days);


			//Wkg_Dys_Cldr_Mth
			#region Plc_Hd_Cndl_Mth

			sql = @"SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Plc_Hd_Cndl_Mth' AND isarchived=false LIMIT 1)
						AS systemvariableid , JF.employeeid AS employeeid,
						Count(HM.date) AS transvalue
						FROM hrms.holiday HM
						LEFT JOIN hrms.Jobfiling JF ON JF.holidaycategoryid = HM.holidaycategoryid
						WHERE  JF.isarchived = false AND HM.isarchived = false   AND JF.employeeid 
						IN
						(
							SELECT hm.id FROM hrms.hrmsemployee hm
							LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
							LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
							WHERE pg.id=@PayGroupId AND 
							hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
						)
						AND To_date(Cast(HM.date AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetStartDate AND @timeSheetEndDate
						GROUP BY JF.employeeid";

			var Plc_Hd_Cndl_Mth = await Connection.QueryAsync<SystemVariableDto>(sql, new
			{
				PayGroupId,
				timeSheetStartDate,
				timeSheetEndDate,
				calMonthDays
			});
			List<SystemVariableValues> systemVariableValues_plc_Hd = Plc_Hd_Cndl_Mth.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_plc_Hd);
			#endregion


			//Wkg_Dys_Cldr_Mth
			#region No_Of_Dys_Btw_Dte_Rge

			sql = @"SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='No_Of_Dys_Btw_Dte_Rge' AND isarchived=false LIMIT 1)
						AS systemvariableid , JF.employeeid AS employeeid,
						@calMonthDays AS transvalue
						FROM hrms.Jobfiling JF 
						WHERE  JF.isarchived = false  AND JF.employeeid 
						IN
						(
							SELECT hm.id FROM hrms.hrmsemployee hm
							LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
							LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
							WHERE pg.id=@PayGroupId AND 
							hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
						)
						GROUP BY JF.employeeid";

			var No_Of_Dys_Btw_Dte_Rge = await Connection.QueryAsync<SystemVariableDto>(sql, new
			{
				PayGroupId,
				timeSheetStartDate,
				timeSheetEndDate,
				calMonthDays
			});
			List<SystemVariableValues> systemVariableValues_No_Of_Dys_Btw_Dte_Rge = No_Of_Dys_Btw_Dte_Rge.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_No_Of_Dys_Btw_Dte_Rge);
			#endregion

			//Wkg_Dys_Cldr_Mth
			#region Pbc_Hds_Cldr_yer

			sql = @"SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Pbc_Hds_Cldr_yer' AND isarchived=false LIMIT 1)
						AS systemvariableid , JF.employeeid AS employeeid,
						Count(HM.date) AS transvalue
						FROM hrms.holiday HM
						LEFT JOIN hrms.Jobfiling JF ON JF.holidaycategoryid = HM.holidaycategoryid
						WHERE  JF.isarchived = false AND HM.isarchived = false   AND JF.employeeid 
						IN
						(
							SELECT hm.id FROM hrms.hrmsemployee hm
							LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
							LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
							WHERE pg.id=@PayGroupId AND 
							hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
						)
						AND To_date(Cast(HM.date AS TEXT), 'YYYY-MM-DD') BETWEEN @yearStart AND @yearEnd
						GROUP BY JF.employeeid";

			var Pbc_Hds_Cldr_yer = await Connection.QueryAsync<SystemVariableDto>(sql, new
			{
				PayGroupId,
				yearStart,
				yearEnd,
				calMonthDays
			});
			List<SystemVariableValues> systemVariableValues_Pbc_Hds_Cldr_yer= Pbc_Hds_Cldr_yer.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_Pbc_Hds_Cldr_yer);
			#endregion

			return dd.ToString();
        }
    }
}
