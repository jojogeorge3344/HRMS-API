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
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues);
			#endregion

			return dd.ToString();
        }
    }
}
