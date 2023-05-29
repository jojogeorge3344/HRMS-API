using AutoMapper.Configuration.Annotations;
using Chef.Common.Models;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Types;
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

			//NOT
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
				List<SystemVariableValues> systemVariableValues_ot = new List<SystemVariableValues>();
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
							sql = @"SELECT MIN(lowerlimit),MAX(upperlimit),OTS.overtimetype 
								FROM hrms.overtimeslab OTS 
								WHERE OTS.overtimepolicyid = @overtimepolicyid
								GROUP BY OTS.overtimetype 
								ORDER BY OTS.overtimetype";
							var oTSlab = await Connection.QueryAsync<OverTimeSlab>(sql, new
							{
								overtimepolicyid = emp.OverTimePolicyId
							});
							List<SystemVariableOTDto> systemVariableOTDto = (List<SystemVariableOTDto>)EmpSettings;
							var row = systemVariableOTDto.FirstOrDefault(x=>x.NormalOverTime!=0);
							if (row != null&& row.NormalOverTime>0)
							{
								decimal OTHrs = row.NormalOverTime;
								foreach (OverTimeSlab item in oTSlab)
								{
									decimal lowerLimit = item.LowerLimit;
									decimal upperLimit = item.UpperLimit;
									if (item.OverTimeType == (int)OverTimeType.NormalOverTime)
									{
										if (OTHrs > lowerLimit)
										{
											if (OTHrs > upperLimit)
											{
												systemVariableValues_ot.
												dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_ot);
											}
										}
									}
								}
							}
						}
						
					}
					else
					{ 
					
					}
					//sql = @"SELECT OT.fromdate,OT.todate, OT.employeeid AS employeeid,
					//	OTC.isovertimeslab , OTC.ismonthly,OTC.overtimepolicyid
					//	FROM hrms.overtime OT
					//	INNER JOIN hrms.overtimepolicyconfiguration OTC ON OTC.overtimepolicyid = OT.overtimepolicyid
					//	WHERE  OT.requeststatus=1  AND OT.employeeid ";

					//var EmpSettings = await Connection.QueryAsync<SystemVariableOTDto>(sql, new
					//{
					//	timeSheetStartDate,
					//	timeSheetEndDate
					//});
				}
				//sql = @"SELECT
				//		(SELECT id FROM hrms.systemvariable WHERE code='Nml_Ot_Cldr_Mth' AND isarchived=false LIMIT 1)
				//		AS Nmlsystemvariableid ,(SELECT id FROM hrms.systemvariable WHERE code='Sp_Ot' AND isarchived=false LIMIT 1)
				//		AS Sp_Otsystemvariableid ,OT.fromdate,OT.todate, OT.employeeid AS employeeid,
				//		CASE WHEN  coalesce(OTC.ismonthly,true)=true THEN SUM(OT.normalovertime) ELSE OT.normalovertime END AS  AS transvalue,
				//		OTC.isovertimeslab , OTC.ismonthly,OTC.overtimepolicyid
				//		FROM hrms.overtime OT
				//		INNER JOIN hrms.overtimepolicyconfiguration OTC ON OTC.overtimepolicyid = OT.overtimepolicyid
				//		WHERE  OT.requeststatus=1  AND OT.employeeid 
				//		IN
				//		(
				//			SELECT hm.id FROM hrms.hrmsemployee hm
				//			LEFT JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
				//			LEFT JOIN hrms.paygroup pg ON jf.paygroupid = pg.id
				//			WHERE pg.id=@PayGroupId AND 
				//			hm.isarchived=false AND jf.isarchived=false AND pg.isarchived=false
				//		)
				//		AND To_date(Cast(OT.todate AS TEXT), 'YYYY-MM-DD') BETWEEN @timeSheetStartDate AND @timeSheetEndDate
				//		GROUP BY OT.employeeid,OT.fromdate,OT.todate,OT.normalovertime,OTC.isovertimeslab, OTC.ismonthly,OTC.overtimepolicyid";

				//var NOt = await Connection.QueryAsync<SystemVariableOTDto>(sql, new
				//{
				//	PayGroupId,
				//	timeSheetStartDate,
				//	timeSheetEndDate
				//});
				//List<SystemVariableValues> systemVariableValues_Not = new List<SystemVariableValues>();
				//foreach (SystemVariableOTDto systemVariableOTDto in NOt)
				//{
				//	if (systemVariableOTDto.IsOverTimeSlab == true)
				//	{
				//		//if (systemVariableOTDto.IsMonthly)
				//		//{
				//		var overTimeSlabs = await overTimePolicySlabRepository.GetOverTimeComponentDetails(systemVariableOTDto.OverTimePolicyId);
				//		decimal hrs = systemVariableOTDto.TransValue;
				//		decimal lowerlimit1 = 0;
				//		decimal lowerlimit2 = 0;
				//		decimal upperlimit1 = 0;
				//		decimal upperlimit2 = 0;
				//		for (int i = 0; i < overTimeSlabs.ToList().Count; i++)
				//		{
				//			if (i == 0)
				//			{
				//				lowerlimit1 = overTimeSlabs.ToList()[i].LowerLimit;
				//				upperlimit1 = overTimeSlabs.ToList()[i].UpperLimit;
				//			}
				//			else
				//			{
				//				if (overTimeSlabs.ToList()[i].LowerLimit > lowerlimit1 && overTimeSlabs.ToList()[i].UpperLimit > upperlimit1)
				//				{
				//					lowerlimit2 = overTimeSlabs.ToList()[i].LowerLimit;
				//					upperlimit2 = overTimeSlabs.ToList()[i].UpperLimit;
				//				}
				//				else
				//				{
				//					lowerlimit2 = lowerlimit1;
				//					upperlimit2 = upperlimit1;
				//					lowerlimit1 = overTimeSlabs.ToList()[i].LowerLimit;
				//					upperlimit1 = overTimeSlabs.ToList()[i].UpperLimit;
				//				}
				//			}
				//		}
				//		if (hrs > lowerlimit1)
				//		{
				//			if (hrs > upperlimit1)
				//			{
				//				systemVariableValues_Not = NOt.Select(x => new SystemVariableValues()
				//				{
				//					SystemVariableId = x.Nml_SystemVariableId,
				//					TransValue = x.TransValue,
				//					EmployeeId = x.EmployeeId,
				//					TransDate = monthEnd
				//				}).ToList();
				//			}
				//			else
				//			{
				//				systemVariableValues_Not = NOt.Select(x => new SystemVariableValues()
				//				{
				//					SystemVariableId = x.Nml_SystemVariableId,
				//					TransValue = upperlimit1,
				//					EmployeeId = x.EmployeeId,
				//					TransDate = monthEnd
				//				}).ToList();
				//				if (hrs > upperlimit2)
				//				{
				//					systemVariableValues_Not = NOt.Select(x => new SystemVariableValues()
				//					{
				//						SystemVariableId = x.Nml_SystemVariableId,
				//						TransValue = upperlimit2 - upperlimit1,
				//						EmployeeId = x.EmployeeId,
				//						TransDate = monthEnd
				//					}).ToList();
				//				}
				//				else
				//				{
				//					systemVariableValues_Not = NOt.Select(x => new SystemVariableValues()
				//					{
				//						SystemVariableId = x.Nml_SystemVariableId,
				//						TransValue = hrs - upperlimit1,
				//						EmployeeId = x.EmployeeId,
				//						TransDate = monthEnd
				//					}).ToList();
				//				}
				//			}
				//		}
				//		//}
				//		//else
				//		//{ 

				//		//}
				//	}
				//	else
				//	{
				//		systemVariableValues_Not = NOt.Select(x => new SystemVariableValues()
				//		{
				//			SystemVariableId = x.Nml_SystemVariableId,
				//			TransValue = x.TransValue,
				//			EmployeeId = x.EmployeeId,
				//			TransDate = monthEnd
				//		}).ToList();


				//	}
				//}
				////Dictionary<int, int> overtimeSumByEmpId = new Dictionary<int, int>();

				////foreach (var employee in employees)
				////{
				////	if (overtimeSumByEmpId.ContainsKey(employee.EmpId))
				////	{
				////		overtimeSumByEmpId[employee.EmpId] += employee.Overtime;
				////	}
				////	else
				////	{
				////		overtimeSumByEmpId[employee.EmpId] = employee.Overtime;
				////	}
				////}

				//dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_Not);
				tenantSimpleUnitOfWork.Commit();
			}
			catch (Exception)
			{
				tenantSimpleUnitOfWork.Rollback();
				throw;
			}


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

					/*UNION
						
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
						GROUP BY OT.employeeid*/";

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
