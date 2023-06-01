using AutoMapper.Configuration.Annotations;
using Chef.Common.Models;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Types;
using Duende.IdentityServer.Models;
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
		private readonly IOverTimePolicySlabRepository overTimePolicySlabRepository;
		private readonly ITenantSimpleUnitOfWork tenantSimpleUnitOfWork;

		public SystemVariableValuesRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session, IBulkUploadRepository bulkUploadRepository,
			IPayrollProcessingMethodRepository payrollProcessingMethodRepository,
			IPayGroupRepository payGroupRepository, IOverTimePolicySlabRepository overTimePolicySlabRepository,
			ITenantSimpleUnitOfWork tenantSimpleUnitOfWork
			) : base(httpContextAccessor, session)
        {
            this.bulkUploadRepository = bulkUploadRepository;
            this.payrollProcessingMethodRepository = payrollProcessingMethodRepository;
			this.payGroupRepository = payGroupRepository;
			this.overTimePolicySlabRepository = overTimePolicySlabRepository;
			this.tenantSimpleUnitOfWork = tenantSimpleUnitOfWork;
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

			DateTime leaveCutoffYearStart = new DateTime(intYear-1, 12, intleaveCutoff);
			DateTime leaveCutoffYearEnd = new DateTime(intYear , 12, intleaveCutoff);

			DateTime timeSheetCutOffYearStart = new DateTime(intYear - 1, 12, intTimeSheetCutOff);
			DateTime timeSheetCutOffYearEnd = new DateTime(intYear, 12, intTimeSheetCutOff);

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

			//NOT
			#region slabOT
			tenantSimpleUnitOfWork.BeginTransaction();
			try
			{
				sql = @"SELECT  hm.id,jf.overtimepolicyid,OTC.isovertimeslab,OTC.ismonthly
						FROM hrms.hrmsemployee hm
						INNER JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
						INNER JOIN hrms.overtimepolicyconfiguration OTC ON OTC.overtimepolicyid = jf.overtimepolicyid
						WHERE jf.paygroupid=@PayGroupId AND 
						hm.isarchived=false AND jf.isarchived=false ";
				var empList = await Connection.QueryAsync<SystemVariableEmpId>(sql, new
				{
					PayGroupId
				});
				List<SystemVariableValues> systemVariableValues_not = new List<SystemVariableValues>();
				foreach (SystemVariableEmpId emp in empList)
				{
					if (emp.IsOverTimeSlab)
					{
						if (emp.IsMonthly)
						{
							sql = @"SELECT
							(SELECT id FROM hrms.systemvariable WHERE code='Nml_Ot_Cldr_Mth' AND isarchived=false LIMIT 1) AS Nml_SystemVariableId ,
							(SELECT id FROM hrms.systemvariable WHERE code='Sp_Ot' AND isarchived=false LIMIT 1) AS Sp_Otsystemvariableid,
							(SELECT id FROM hrms.systemvariable WHERE code='Hd_Ot' AND isarchived=false LIMIT 1) AS Hd_Otsystemvariableid,
							SUM(OT.normalovertime) AS normalovertime,SUM(OT.specialovertime) AS specialovertime,
							SUM(OT.holidayovertime) AS holidayovertime
							FROM hrms.overtime OT
							INNER JOIN hrms.overtimepolicyconfiguration OTC ON OTC.overtimepolicyid = OT.overtimepolicyid
							WHERE  OT.requeststatus=4  AND OT.employeeid = @employeeid AND OT.overtimepolicyid = @overtimepolicyid
							AND To_date(Cast(OT.todate AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetStartDate AND @timeSheetEndDate";

							var EmpSettings = await Connection.QueryAsync<SystemVariableOTDto>(sql, new
							{
								timeSheetStartDate,
								timeSheetEndDate,
								employeeid = emp.Id,
								overtimepolicyid = emp.OverTimePolicyId
							});
							sql = @"SELECT MIN(lowerlimit) AS lowerlimit,MAX(upperlimit) AS upperlimit,OTS.overtimetype 
								FROM hrms.overtimeslab OTS 
								WHERE OTS.overtimepolicyid = @overtimepolicyid
								GROUP BY OTS.overtimetype 
								ORDER BY OTS.overtimetype";
							var oTSlab = await Connection.QueryAsync<OverTimeSlab>(sql, new
							{
								overtimepolicyid = emp.OverTimePolicyId
							});
							List<SystemVariableOTDto> systemVariableOTDto = (List<SystemVariableOTDto>)EmpSettings;
							var row = systemVariableOTDto.FirstOrDefault(x => x.NormalOverTime != 0);
							if (row != null && row.NormalOverTime > 0)
							{
								decimal OTHrs = row.NormalOverTime;
								decimal lowerLimit = 0;
								decimal upperLimit = 0;
								foreach (OverTimeSlab item in oTSlab)
								{
									if (item.OverTimeType == (int)OverTimeType.NormalOverTime)
									{
										lowerLimit = item.LowerLimit;
										upperLimit = item.UpperLimit;
										if (OTHrs > lowerLimit)
										{
											SystemVariableOTDto empSetting = (SystemVariableOTDto)row;

											if (OTHrs > upperLimit)
											{
												SystemVariableValues systemVarValues = new SystemVariableValues
												{
													SystemVariableId = empSetting.Nml_SystemVariableId,
													TransValue = upperLimit,
													EmployeeId = emp.Id,
													TransDate = monthEnd
												};
												systemVariableValues_not.Add(systemVarValues);
											}
											else
											{
												SystemVariableValues systemVarValues = new SystemVariableValues
												{
													SystemVariableId = empSetting.Nml_SystemVariableId,
													TransValue = OTHrs,
													EmployeeId = emp.Id,
													TransDate = monthEnd
												};
												systemVariableValues_not.Add(systemVarValues);
											}
										}
									}
									if (item.OverTimeType == (int)OverTimeType.SpecialOvertime)
									{
										if (OTHrs > item.LowerLimit)
										{
											SystemVariableOTDto empSetting = (SystemVariableOTDto)row;

											if (OTHrs > item.UpperLimit)
											{
												SystemVariableValues systemVarValues = new SystemVariableValues
												{
													SystemVariableId = empSetting.Sp_OtSystemVariableId,
													TransValue = item.UpperLimit - upperLimit,
													EmployeeId = emp.Id,
													TransDate = monthEnd
												};
												systemVariableValues_not.Add(systemVarValues);
											}
											else
											{
												SystemVariableValues systemVarValues = new SystemVariableValues
												{
													SystemVariableId = empSetting.Sp_OtSystemVariableId,
													TransValue = OTHrs - upperLimit,
													EmployeeId = emp.Id,
													TransDate = monthEnd
												};
												systemVariableValues_not.Add(systemVarValues);
											}
										}
									}
								}
							}
						}
						else
						{
							sql = @"SELECT
							(SELECT id FROM hrms.systemvariable WHERE code='Nml_Ot_Cldr_Mth' AND isarchived=false LIMIT 1) AS Nml_SystemVariableId ,
							(SELECT id FROM hrms.systemvariable WHERE code='Sp_Ot' AND isarchived=false LIMIT 1) AS Sp_Otsystemvariableid,
							(SELECT id FROM hrms.systemvariable WHERE code='Hd_Ot' AND isarchived=false LIMIT 1) AS Hd_Otsystemvariableid,
							OT.normalovertime AS normalovertime,OT.specialovertime AS specialovertime,
							OT.holidayovertime AS holidayovertime
							FROM hrms.overtime OT
							INNER JOIN hrms.overtimepolicyconfiguration OTC ON OTC.overtimepolicyid = OT.overtimepolicyid
							WHERE  OT.requeststatus=4  AND OT.employeeid = @employeeid AND OT.overtimepolicyid = @overtimepolicyid
							AND To_date(Cast(OT.todate AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetStartDate AND @timeSheetEndDate";

							var EmpSettings = await Connection.QueryAsync<SystemVariableOTDto>(sql, new
							{
								timeSheetStartDate,
								timeSheetEndDate,
								employeeid = emp.Id,
								overtimepolicyid = emp.OverTimePolicyId
							});
							foreach (SystemVariableOTDto empSett in EmpSettings)
							{
								sql = @"SELECT MIN(lowerlimit) AS lowerlimit,MAX(upperlimit) AS upperlimit,OTS.overtimetype 
								FROM hrms.overtimeslab OTS 
								WHERE OTS.overtimepolicyid = @overtimepolicyid
								GROUP BY OTS.overtimetype 
								ORDER BY OTS.overtimetype";
								var oTSlab = await Connection.QueryAsync<OverTimeSlab>(sql, new
								{
									overtimepolicyid = emp.OverTimePolicyId
								});
								List<SystemVariableOTDto> systemVariableOTDto = (List<SystemVariableOTDto>)EmpSettings;
								if (empSett != null && empSett.NormalOverTime > 0)
								{
									decimal OTHrs = empSett.NormalOverTime;
									decimal lowerLimit = 0;
									decimal upperLimit = 0;
									foreach (OverTimeSlab item in oTSlab)
									{
										if (item.OverTimeType == (int)OverTimeType.NormalOverTime)
										{
											lowerLimit = item.LowerLimit;
											upperLimit = item.UpperLimit;
											if (OTHrs > lowerLimit)
											{

												if (OTHrs > upperLimit)
												{
													SystemVariableValues systemVarValues = new SystemVariableValues
													{
														SystemVariableId = empSett.Nml_SystemVariableId,
														TransValue = upperLimit,
														EmployeeId = emp.Id,
														TransDate = monthEnd
													};
													systemVariableValues_not.Add(systemVarValues);
												}
												else
												{
													SystemVariableValues systemVarValues = new SystemVariableValues
													{
														SystemVariableId = empSett.Nml_SystemVariableId,
														TransValue = OTHrs,
														EmployeeId = emp.Id,
														TransDate = monthEnd
													};
													systemVariableValues_not.Add(systemVarValues);
												}
											}
										}
										if (item.OverTimeType == (int)OverTimeType.SpecialOvertime)
										{
											if (OTHrs > item.LowerLimit)
											{

												if (OTHrs > item.UpperLimit)
												{
													SystemVariableValues systemVarValues = new SystemVariableValues
													{
														SystemVariableId = empSett.Sp_OtSystemVariableId,
														TransValue = item.UpperLimit - upperLimit,
														EmployeeId = emp.Id,
														TransDate = monthEnd
													};
													systemVariableValues_not.Add(systemVarValues);
												}
												else
												{
													SystemVariableValues systemVarValues = new SystemVariableValues
													{
														SystemVariableId = empSett.Sp_OtSystemVariableId,
														TransValue = OTHrs - upperLimit,
														EmployeeId = emp.Id,
														TransDate = monthEnd
													};
													systemVariableValues_not.Add(systemVarValues);
												}
											}
										}
									}

								}
							}
							//need to find sum of daily ot
							 systemVariableValues_not = systemVariableValues_not.GroupBy(x=>x.EmployeeId)
								.Select( g=>new SystemVariableValues  { EmployeeId = g.Key, TransValue = g.Sum(x=>x.TransValue) })
								.ToList();
						}
						
					}
					else
					{ 
					
					}
					
				}
				//sum of system var values based on employeeid

				dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_not);
				tenantSimpleUnitOfWork.Commit();
			}
			catch (Exception)
			{
				tenantSimpleUnitOfWork.Rollback();
				throw;
			}
			#endregion

			//OT
			#region OT
			//sql = @"SELECT
			//			(SELECT id FROM hrms.systemvariable WHERE code='Hd_Ot' AND isarchived=false LIMIT 1)
			//			AS systemvariableid , OT.employeeid AS employeeid,
			//			SUM(OT.holidayovertime) AS transvalue
			//			FROM hrms.overtime OT
			//			WHERE  OT.requeststatus=1  AND OT.employeeid 
			//			IN
			//			(
			//				SELECT hm.id FROM hrms.hrmsemployee hm
			//				LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
			//				LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
			//				WHERE pg.id=@PayGroupId AND 
			//				hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
			//			)
			//			AND To_date(Cast(OT.todate AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetStartDate AND @timeSheetEndDate
			//			GROUP BY OT.employeeid

			//		UNION

			//		SELECT
			//			(SELECT id FROM hrms.systemvariable WHERE code='Sp_Ot' AND isarchived=false LIMIT 1)
			//			AS systemvariableid , OT.employeeid AS employeeid,
			//			SUM(OT.specialovertime) AS transvalue
			//			FROM hrms.overtime OT
			//			WHERE  OT.requeststatus=1  AND OT.employeeid 
			//			IN
			//			(
			//				SELECT hm.id FROM hrms.hrmsemployee hm
			//				LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
			//				LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
			//				WHERE pg.id=@PayGroupId AND 
			//				hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
			//			)
			//			AND To_date(Cast(OT.todate AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetStartDate AND @timeSheetEndDate
			//			GROUP BY OT.employeeid

			//		/*UNION

			//		SELECT
			//			(SELECT id FROM hrms.systemvariable WHERE code='Nml_Ot_Cldr_Mth' AND isarchived=false LIMIT 1)
			//			AS systemvariableid , OT.employeeid AS employeeid,
			//			SUM(OT.normalovertime) AS transvalue
			//			FROM hrms.overtime OT
			//			WHERE  OT.requeststatus=1  AND OT.employeeid 
			//			IN
			//			(
			//				SELECT hm.id FROM hrms.hrmsemployee hm
			//				LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
			//				LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
			//				WHERE pg.id=@PayGroupId AND 
			//				hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
			//			)
			//			AND To_date(Cast(OT.todate AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetStartDate AND @timeSheetEndDate
			//			GROUP BY OT.employeeid*/";

			//var Ot = await Connection.QueryAsync<SystemVariableDto>(sql, new { PayGroupId, timeSheetStartDate, timeSheetEndDate
			//});
			//List<SystemVariableValues> systemVariableValues_ot = Ot.Select(x => new SystemVariableValues()
			//{
			//	SystemVariableId = x.SystemVariableId,
			//	TransValue = x.TransValue,
			//	EmployeeId = x.EmployeeId,
			//	TransDate = monthEnd
			//}).ToList();
			//dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_ot);
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

			//Worked days Wkd_Dys_Cldr_Mth
			#region Wkd_Dys_Cldr_Mth
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
			#endregion

			//Plc_Hd_Cndl_Mth
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

			//No_Of_Dys_Btw_Dte_Rge
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

			//Pbc_Hds_Cldr_yer
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

			return dd.ToString();

			#endregion

			//Lop days in cal year Lop_Dys_Cldr_yr
			#region Lop_Dys_Cldr_yr
			 sql = @"SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Lop_Dys_Cldr_yr' AND isarchived=false LIMIT 1)
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
						AND To_date(Cast(ld.leavedate AS TEXT), 'YYYY-MM-DD') BETWEEN @leaveCutoffYearStart AND @leaveCutoffYearEnd
						GROUP BY ld.employeeid;";

			var Lop_Dys_Cldr_yr = await Connection.QueryAsync<SystemVariableDto>(sql, new
			{
				PayGroupId,
				leaveCutoffYearStart,
				leaveCutoffYearEnd
			});
			List<SystemVariableValues> systemVariableValues_lop_cal = Lop_Dys_Cldr_yr.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			 dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_lop_cal);
			#endregion

			//Wkg_dys_Cldr_yer
			#region Wkg_dys_Cldr_yer


			sql = @"SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Wkg_dys_Cldr_yer' AND isarchived=false LIMIT 1)
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
						AND To_date(Cast(HM.date AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetCutOffYearStart
						AND @timeSheetCutOffYearEnd

						GROUP BY JF.employeeid";

			var Wkg_dys_Cldr_yer = await Connection.QueryAsync<SystemVariableDto>(sql, new
			{
				PayGroupId,
				timeSheetCutOffYearStart,
				timeSheetCutOffYearEnd,
				calMonthDays
			});
			List<SystemVariableValues> systemVariableValues_Wkg_days_year = Wkg_dys_Cldr_yer.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_Wkg_days_year);
			#endregion

			//Worked days Wkd_Dys_Cldr_yer
			#region Wkd_Dys_Cldr_yer
			sql = @"SELECT
			(SELECT id FROM hrms.systemvariable WHERE code='Wkd_Dys_Cldr_yer' AND isarchived=false LIMIT 1)
			AS systemvariableid , JF.employeeid AS employeeid,
			(@calMonthDays -Count(HM.date) - (SELECT 
			COUNT(ld.leavedate) 
			FROM hrms.leave l
			LEFT JOIN hrms.leavecomponent lc ON l.leavecomponentid=lc.id
			LEFT JOIN hrms.leavedetails ld ON l.id = ld.leaveid
			WHERE  lc.isunpaidleave=true AND l.isarchived=false AND lc.isarchived=false AND l.employeeid = JF.employeeid 
			AND To_date(Cast(ld.leavedate AS TEXT), 'YYYY-MM-DD') BETWEEN @leaveCutoffYearStart
			AND @leaveCutoffYearEnd )) AS transvalue
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
			AND To_date(Cast(HM.date AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetCutOffYearStart AND @timeSheetCutOffYearEnd
			GROUP BY JF.employeeid";

			var Wkd_Dys_Cldr_yer = await Connection.QueryAsync<SystemVariableDto>(sql, new
			{
				PayGroupId,
				timeSheetCutOffYearStart,
				timeSheetCutOffYearEnd,
				calMonthDays,
				leaveCutoffYearStart,
				leaveCutoffYearEnd
			});
			List<SystemVariableValues> systemVariableValues_Wkd_days_year = Wkd_Dys_Cldr_yer.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_Wkd_days_year);
			#endregion

			//Wkg_Dys_Dte_Rg
			#region Wkg_Dys_Dte_Rg



			sql = @"SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Wkg_Dys_Dte_Rg' AND isarchived=false LIMIT 1)
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

			var Wkg_Dys_Dte_Rg = await Connection.QueryAsync<SystemVariableDto>(sql, new
			{
				PayGroupId,
				timeSheetStartDate,
				timeSheetEndDate,
				calMonthDays
			});
			List<SystemVariableValues> systemVariableValues_Wkg_days_Dte_rg = Wkg_Dys_Dte_Rg.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_Wkg_days_Dte_rg);
			#endregion

			// Wkd_Dys_Dte_Rge
			#region Wkd_Dys_Dte_Rge
			sql = @"SELECT
			(SELECT id FROM hrms.systemvariable WHERE code='Wkd_Dys_Dte_Rge' AND isarchived=false LIMIT 1)
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

			var Wkd_Dys_Dte_Rge = await Connection.QueryAsync<SystemVariableDto>(sql, new
			{
				PayGroupId,
				timeSheetStartDate,
				timeSheetEndDate,
				calMonthDays,
				leaveStartDate,
				leaveEndDate
			});
			List<SystemVariableValues> systemVariableValues_Wkd_days_Dte_Rge = Wkd_Dys_Dte_Rge.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_Wkd_days_Dte_Rge);
			#endregion

			// Wkg_Dys_Frm_Jng
			#region Wkg_Dys_Frm_Jng
			sql = @"SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Wkg_Dys_Frm_Jng' AND isarchived=false LIMIT 1)
						AS systemvariableid , JD.employeeid AS employeeid,
						DATE_PART('day', @monthEnd -(JD.dateofjoin)) AS transvalue
						FROM hrms.jobdetails JD
						WHERE  JD.employeeid 
						IN
						(
							SELECT hm.id FROM hrms.hrmsemployee hm
							LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
							LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
							WHERE pg.id=@PayGroupId AND 
							hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
						)";

			var Wkg_Dys_Frm_Jng = await Connection.QueryAsync<SystemVariableDto>(sql, new
			{
				PayGroupId,
				monthEnd
			});
			List<SystemVariableValues> systemVariableValues_Wkg_Dys_Frm_Jng = Wkg_Dys_Frm_Jng.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_Wkg_Dys_Frm_Jng);
			#endregion

			// Lop_Dys_Frm_Jng
			#region Lop_Dys_Frm_Jng
			sql = @"SELECT
						(SELECT id FROM hrms.systemvariable WHERE code='Lop_Dys_Frm_Jng' AND isarchived=false LIMIT 1)
						AS systemvariableid , ld.employeeid AS employeeid,
						COUNT(ld.leavedate) AS transvalue
						FROM hrms.leave l
						LEFT JOIN hrms.leavecomponent lc ON l.leavecomponentid=lc.id
						LEFT JOIN hrms.leavedetails ld ON l.id = ld.leaveid
						LEFT JOIN hrms.jobdetails JD ON JD.employeeid = ld.employeeid
						WHERE  lc.isunpaidleave=true AND l.isarchived=false AND lc.isarchived=false AND l.employeeid 
						IN
						(
							SELECT hm.id FROM hrms.hrmsemployee hm
							LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
							LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
							WHERE pg.id=@PayGroupId AND hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
						)
						AND To_date(Cast(ld.leavedate AS TEXT), 'YYYY-MM-DD') BETWEEN JD.dateofjoin AND @leaveEndDate
						GROUP BY ld.employeeid";

			var Lop_Dys_Frm_Jng = await Connection.QueryAsync<SystemVariableDto>(sql, new
			{
				PayGroupId,
				leaveEndDate
			});
			List<SystemVariableValues> systemVariableValues_Lop_Dys_Frm_Jng = Lop_Dys_Frm_Jng.Select(x => new SystemVariableValues()
			{
				SystemVariableId = x.SystemVariableId,
				TransValue = x.TransValue,
				EmployeeId = x.EmployeeId,
				TransDate = monthEnd
			}).ToList();
			dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_Lop_Dys_Frm_Jng);
			#endregion

		}
	}
}
