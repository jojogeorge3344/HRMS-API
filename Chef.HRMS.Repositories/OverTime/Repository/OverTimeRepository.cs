using Chef.Common.Models;
using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Types;
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

		public async Task<IEnumerable<OverTimePayrollViewModel>> GetOvertimeByPaygroupId(int paygroupId, string fromDate, string toDate)
		{
			string sql = "";
			#region old q
			//var sql = @"SELECT OT.id AS OverTimeId,OT.normalovertime AS nothrs,0 AS hothrs,
			//                     0 AS sothrs,OT.employeeid,(OTS.valuevariable * escd.monthlyamount)/100 AS notrate,
			//                     0 hotrate,0 AS hotrate,
			//                     PC.id AS componentid,
			//                     ((OTS.valuevariable * escd.monthlyamount)/100)*OT.normalovertime AS notamount,
			//                     0 AS hotamount,
			//                     0 AS sotamount,EM.firstname AS EmployeeName,JD.employeenumber AS EmployeeCode
			//                     FROM hrms.overtime OT
			//                     INNER JOIN hrms.jobfiling jf ON jf.employeeid = OT.employeeid
			//                     INNER JOIN hrms.overtimepolicyconfiguration OTC ON jf.overtimepolicyid = OTC.overtimepolicyid
			//                     INNER JOIN hrms.payrollcomponent PC ON PC.id = OTC.normalovertime
			//                     INNER JOIN hrms.employeesalaryconfigurationdetails escd ON escd.payrollcomponentid = PC.id
			//			AND escd.employeeid = OT.employeeid
			//			INNER JOIN hrms.overtimeslab OTS ON OTS.overtimepolicyid = jf.overtimepolicyid
			//			AND OTS.overtimetype=1 AND OTS.isarchived = false
			//                     INNER JOIN hrms.hrmsemployee EM ON EM.id = OT.employeeid
			//                     INNER JOIN hrms.jobdetails JD ON JD.employeeid = OT.employeeid
			//                     WHERE (To_Date(cast(coalesce(OT.todate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromdate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
			//                     AND OT.isarchived=false AND jf.paygroupid = @payGroupId  AND OT.normalovertime>0
			//		    GROUP BY OT.EmployeeID,OT.Id,ots.valuevariable,
			//		    escd.monthlyamount,
			//		    pc.id,em.firstname,
			//		    jd.employeenumber

			//			UNION 

			//			SELECT OT.id AS OverTimeId,0 AS nothrs,OT.holidayovertime AS hothrs,
			//                     0 AS sothrs,OT.employeeid,0 AS notrate,
			//                     (OTS.valuevariable * escd1.monthlyamount)/100 AS hotrate,0 AS hotrate,
			//                     PC1.id AS componentid,
			//                     0 AS notamount,
			//                     ((OTS.valuevariable * escd1.monthlyamount)/100)*OT.holidayovertime AS hotamount,
			//                     0 AS sotamount,EM.firstname AS EmployeeName,JD.employeenumber AS EmployeeCode
			//                     FROM hrms.overtime OT
			//                     INNER JOIN hrms.jobfiling jf ON jf.employeeid = OT.employeeid
			//                     INNER JOIN hrms.overtimepolicyconfiguration OTC ON jf.overtimepolicyid = OTC.overtimepolicyid
			//                     INNER JOIN hrms.payrollcomponent PC1 ON PC1.id = OTC.holidayovertime
			//                     INNER JOIN hrms.employeesalaryconfigurationdetails escd1 ON escd1.payrollcomponentid = PC1.id
			//			AND escd1.employeeid = OT.employeeid
			//                     INNER JOIN hrms.overtimeslab OTS ON OTS.overtimepolicyid = jf.overtimepolicyid
			//			AND OTS.overtimetype=1 AND OTS.isarchived = false
			//                     INNER JOIN hrms.hrmsemployee EM ON EM.id = OT.employeeid
			//                     INNER JOIN hrms.jobdetails JD ON JD.employeeid = OT.employeeid
			//                     WHERE (To_Date(cast(coalesce(OT.todate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromdate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
			//                     AND OT.isarchived=false AND jf.paygroupid = @payGroupId AND OT.specialovertime>0
			//			GROUP BY OT.EmployeeID,OT.Id,ots.valuevariable,
			//		    escd1.monthlyamount,
			//		    pc1.id,em.firstname,
			//		    jd.employeenumber

			//			UNION

			//			SELECT OT.id AS OverTimeId,0 AS nothrs,0 AS hothrs,
			//                     OT.specialovertime AS sothrs,OT.employeeid,0 AS notrate,
			//                     0 AS hotrate,(OTS.valuevariable * escd2.monthlyamount)/100 AS hotrate,
			//                     PC2.id AS componentid,
			//                     0 AS notamount,
			//                     0 AS hotamount,
			//                     ((OTS.valuevariable * escd2.monthlyamount)/100 )*OT.specialovertime AS sotamount,
			//                     EM.firstname AS EmployeeName,JD.employeenumber AS EmployeeCode
			//                     FROM hrms.overtime OT
			//                     INNER JOIN hrms.jobfiling jf ON jf.employeeid = OT.employeeid
			//                     INNER JOIN hrms.overtimepolicyconfiguration OTC ON jf.overtimepolicyid = OTC.overtimepolicyid
			//                     INNER JOIN hrms.payrollcomponent PC2 ON PC2.id = OTC.specialovertime
			//                     INNER JOIN hrms.employeesalaryconfigurationdetails escd2 ON escd2.payrollcomponentid = PC2.id
			//			AND escd2.employeeid = OT.employeeid
			//                     INNER JOIN hrms.overtimeslab OTS ON OTS.overtimepolicyid = jf.overtimepolicyid
			//			AND OTS.overtimetype=1 AND OTS.isarchived = false
			//                     INNER JOIN hrms.hrmsemployee EM ON EM.id = OT.employeeid
			//                     INNER JOIN hrms.jobdetails JD ON JD.employeeid = OT.employeeid
			//                     WHERE (To_Date(cast(coalesce(OT.todate) as TEXT),'YYYY MM DD') BETWEEN To_Date(cast(coalesce(@fromdate) as TEXT),'YYYY MM DD') AND To_Date(cast(coalesce(@ToDate) as TEXT),'YYYY MM DD')) 
			//                     AND OT.isarchived=false AND jf.paygroupid = @payGroupId AND OT.specialovertime>0
			//			GROUP BY OT.EmployeeID,OT.Id,ots.valuevariable,
			//		    escd2.monthlyamount,
			//		    pc2.id,em.firstname,
			//		    jd.employeenumber";
			#endregion

			List<OverTimePayrollViewModel> overTimePayrollViewModel = new List<OverTimePayrollViewModel>();
			#region slabOT
			try
			{
				sql = @"SELECT  hm.id,jf.overtimepolicyid,OTC.isovertimeslab,OTC.ismonthly,
						JD.employeenumber AS EmployeeCode,hm.firstname AS EmployeeName
						FROM hrms.hrmsemployee hm
						INNER JOIN hrms.jobfiling jf ON hm.id=jf.employeeid
						INNER JOIN hrms.overtimepolicyconfiguration OTC ON OTC.overtimepolicyid = jf.overtimepolicyid
						INNER JOIN hrms.jobdetails JD ON JD.employeeid = hm.id
						WHERE jf.paygroupid=@paygroupId AND 
						hm.isarchived=false AND jf.isarchived=false ";
				var empList = await Connection.QueryAsync<OTEmployeeDetails>(sql, new
				{
					paygroupId
				});
				if (empList != null && empList.ToList().Count > 0)
				{
					foreach (OTEmployeeDetails emp in empList)
					{
						if (emp.IsOverTimeSlab)
						{
							if (emp.IsMonthly)
							{
								sql = @"SELECT
							OTC.normalovertime AS NOTComponentID ,
							OTC.specialovertime AS SOTComponentID,
							OTC.holidayovertime AS HOTComponentID,
							SUM(OT.normalovertime) AS normalovertime,SUM(OT.specialovertime) AS specialovertime,
							SUM(OT.holidayovertime) AS holidayovertime,escd.monthlyamount AS notrate,escd1.monthlyamount AS sotrate,escd2.monthlyamount AS hotrate
							FROM hrms.overtime OT
							INNER JOIN hrms.overtimepolicyconfiguration OTC ON OTC.overtimepolicyid = OT.overtimepolicyid

							LEFT JOIN hrms.payrollcomponent PC ON PC.id = OTC.normalovertime
		                    LEFT JOIN hrms.employeesalaryconfigurationdetails escd ON escd.payrollcomponentid = PC.id

							LEFT JOIN hrms.payrollcomponent PC1 ON PC1.id = OTC.specialovertime
		                    LEFT JOIN hrms.employeesalaryconfigurationdetails escd1 ON escd1.payrollcomponentid = PC1.id

							LEFT JOIN hrms.payrollcomponent PC2 ON PC2.id = OTC.holidayovertime
		                    LEFT JOIN hrms.employeesalaryconfigurationdetails escd2 ON escd2.payrollcomponentid = PC2.id

							WHERE  OT.requeststatus=4  AND OT.employeeid = @employeeid AND OT.overtimepolicyid = @overtimepolicyid
							AND To_date(Cast(OT.todate AS TEXT), 'YYYY-MM-DD') BETWEEN To_date(Cast(@fromDate AS TEXT), 'YYYY-MM-DD') AND To_date(Cast(@toDate AS TEXT), 'YYYY-MM-DD')
							GROUP BY OTC.normalovertime ,
							OTC.specialovertime ,
							OTC.holidayovertime ,escd.monthlyamount,escd1.monthlyamount ,escd2.monthlyamount ";

								var EmpSettings = await Connection.QueryAsync<OTDetails>(sql, new
								{
									fromDate,
									toDate,
									employeeid = emp.Id,
									overtimepolicyid = emp.OverTimePolicyId
								});
								sql = @"SELECT OTS.lowerlimit, OTS.upperlimit,OTS.overtimetype,OTS.valuetype,OTS.valuevariable 
								FROM hrms.overtimeslab OTS 
								WHERE OTS.overtimepolicyid = @overtimepolicyid AND OTS.isarchived = false
								ORDER BY OTS.overtimetype";
								var oTSlab = await Connection.QueryAsync<OverTimeSlab>(sql, new
								{
									overtimepolicyid = emp.OverTimePolicyId
								});
								var row = EmpSettings.ToList().FirstOrDefault(x => x.NormalOverTime != 0);
								if (row != null && row.NormalOverTime > 0|| row != null && row.HolidayOverTime > 0)
								{
									decimal OTHrs = row.NormalOverTime;
									decimal HOTHrs = row.HolidayOverTime;
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
												OTDetails empSetting = (OTDetails)row;

												if (OTHrs > upperLimit)
												{
													decimal Amt = 0;
													decimal Hrs = upperLimit - lowerLimit + 1;
													if ((int)item.ValueType == 1) //percentage
													{
														Amt = (Hrs * item.ValueVariable * row.NOTRate) / 100;
													}
													OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
													{
														NotHrs = Hrs,
														HotHrs = 0,
														SotHrs = 0,
														EmployeeId = emp.Id,
														EmployeeCode = emp.EmployeeCode,
														EmployeeName = emp.EmployeeName,
														NotRate = row.NOTRate,
														HotRate = 0,
														SotRate = 0,
														ComponentId = row.NOTComponentID,
														NotAmount = Amt,
														HotAmount = 0,
														SotAmount = 0,
														OverTimeId = 0,
													};
													overTimePayrollViewModel.Add(overTimeViewModel);
												}
												else
												{
													decimal Amt = 0;
													decimal Hrs = OTHrs - lowerLimit + 1;
													if ((int)item.ValueType == 1) //percentage
													{
														Amt = (Hrs * item.ValueVariable * row.NOTRate) / 100;
													}
													OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
													{
														NotHrs = Hrs,
														HotHrs = 0,
														SotHrs = 0,
														EmployeeId = emp.Id,
														EmployeeCode = emp.EmployeeCode,
														EmployeeName = emp.EmployeeName,
														NotRate = row.NOTRate,
														HotRate = 0,
														SotRate = 0,
														ComponentId = row.NOTComponentID,
														NotAmount = Amt,
														HotAmount = 0,
														SotAmount = 0,
														OverTimeId = 0,
													};
													overTimePayrollViewModel.Add(overTimeViewModel);
												}
											}
										}
										if (item.OverTimeType == (int)OverTimeType.SpecialOvertime)
										{
											lowerLimit = item.LowerLimit;
											upperLimit = item.UpperLimit;
											if (OTHrs > item.LowerLimit)
											{

												if (OTHrs > item.UpperLimit)
												{
													decimal Amt = 0;
													decimal Hrs = upperLimit - lowerLimit + 1;
													if ((int)item.ValueType == 1) //percentage
													{
														Amt = (Hrs * item.ValueVariable * row.SOTRate) / 100;
													}
													OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
													{
														NotHrs = 0,
														HotHrs = 0,
														SotHrs = Hrs,
														EmployeeId = emp.Id,
														EmployeeCode = emp.EmployeeCode,
														EmployeeName = emp.EmployeeName,
														NotRate = 0,
														HotRate = 0,
														SotRate = row.SOTRate,
														ComponentId = row.SOTComponentID,
														NotAmount = 0,
														HotAmount = 0,
														SotAmount = Amt,
														OverTimeId = 0,
													};
													overTimePayrollViewModel.Add(overTimeViewModel);
												}
												else
												{
													decimal Amt = 0;
													decimal Hrs = OTHrs - lowerLimit + 1;
													if ((int)item.ValueType == 1) //percentage
													{
														Amt = (Hrs * item.ValueVariable * row.SOTRate) / 100;
													}
													OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
													{
														NotHrs = 0,
														HotHrs = 0,
														SotHrs = Hrs,
														EmployeeId = emp.Id,
														EmployeeCode = emp.EmployeeCode,
														EmployeeName = emp.EmployeeName,
														NotRate = 0,
														HotRate = 0,
														SotRate = row.SOTRate,
														ComponentId = row.SOTComponentID,
														NotAmount = 0,
														HotAmount = 0,
														SotAmount = Amt,
														OverTimeId = 0,
													};
													overTimePayrollViewModel.Add(overTimeViewModel);
												}
											}
										}
										if (item.OverTimeType == (int)OverTimeType.HolidayOverTime)
										{
											lowerLimit = item.LowerLimit;
											upperLimit = item.UpperLimit;
											if (HOTHrs > item.LowerLimit)
											{

												if (HOTHrs > item.UpperLimit)
												{
													decimal Amt = 0;
													decimal Hrs = upperLimit - lowerLimit + 1;
													if ((int)item.ValueType == 1) //percentage
													{
														Amt = (Hrs * item.ValueVariable * row.HOTRate) / 100;
													}
													OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
													{
														NotHrs = 0,
														HotHrs = Hrs,
														SotHrs = 0,
														EmployeeId = emp.Id,
														EmployeeCode = emp.EmployeeCode,
														EmployeeName = emp.EmployeeName,
														NotRate = 0,
														HotRate = row.HOTRate,
														SotRate = 0,
														ComponentId = row.HOTComponentID,
														NotAmount = 0,
														HotAmount = Amt,
														SotAmount = 0,
														OverTimeId = 0,
													};
													overTimePayrollViewModel.Add(overTimeViewModel);
												}
												else
												{
													decimal Amt = 0;
													decimal Hrs = HOTHrs - lowerLimit + 1;
													if ((int)item.ValueType == 1) //percentage
													{
														Amt = (Hrs * item.ValueVariable * row.HOTRate) / 100;
													}
													OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
													{
														NotHrs = 0,
														HotHrs = Hrs,
														SotHrs = 0,
														EmployeeId = emp.Id,
														EmployeeCode = emp.EmployeeCode,
														EmployeeName = emp.EmployeeName,
														NotRate = 0,
														HotRate = row.HOTRate,
														SotRate = 0,
														ComponentId = row.HOTComponentID,
														NotAmount = 0,
														HotAmount = Amt,
														SotAmount = 0,
														OverTimeId = 0,
													};
													overTimePayrollViewModel.Add(overTimeViewModel);
												}
											}
										}

									}
								}
							}
							else
							{
								sql = @"SELECT
							
							OTC.normalovertime AS NOTComponentID ,
							OTC.specialovertime AS SOTComponentID,
							OTC.holidayovertime AS HOTComponentID,
							OT.normalovertime AS normalovertime,OT.specialovertime AS specialovertime,
							OT.holidayovertime AS holidayovertime,escd.monthlyamount AS notrate,escd1.monthlyamount AS sotrate,escd2.monthlyamount AS hotrate
							FROM hrms.overtime OT
							INNER JOIN hrms.overtimepolicyconfiguration OTC ON OTC.overtimepolicyid = OT.overtimepolicyid

							LEFT JOIN hrms.payrollcomponent PC ON PC.id = OTC.normalovertime
		                    LEFT JOIN hrms.employeesalaryconfigurationdetails escd ON escd.payrollcomponentid = PC.id

							LEFT JOIN hrms.payrollcomponent PC1 ON PC1.id = OTC.specialovertime
		                    LEFT JOIN hrms.employeesalaryconfigurationdetails escd1 ON escd1.payrollcomponentid = PC1.id

							LEFT JOIN hrms.payrollcomponent PC2 ON PC2.id = OTC.holidayovertime
		                    LEFT JOIN hrms.employeesalaryconfigurationdetails escd2 ON escd2.payrollcomponentid = PC2.id

							WHERE  OT.requeststatus=4  AND OT.employeeid = @employeeid AND OT.overtimepolicyid = @overtimepolicyid
							AND To_date(Cast(OT.todate AS TEXT), 'YYYY-MM-DD') BETWEEN To_date(Cast(@fromDate AS TEXT), 'YYYY-MM-DD') AND To_date(Cast(@toDate AS TEXT), 'YYYY-MM-DD')";

								var EmpSettings = await Connection.QueryAsync<OTDetails>(sql, new
								{
									fromDate,
									toDate,
									employeeid = emp.Id,
									overtimepolicyid = emp.OverTimePolicyId
								});
								foreach (OTDetails empSett in EmpSettings)
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
                                    //if(oTSlab != null || oTSlab.ToList().Count==0)
									if(oTSlab != null && oTSlab.ToList().Count==0)
                                    {
                                        throw new Exception("Slab is not set");
									}
									List<OTDetails> empSettings = (List<OTDetails>)EmpSettings;
									List<SystemVariableOTDto> systemVariableOTDto = empSettings.Select(item => new SystemVariableOTDto
									{
										Nml_SystemVariableId = item.NOTComponentID,
										Sp_OtSystemVariableId = item.SOTComponentID,
										Hd_OtSystemVariableId = item.HOTComponentID
									}).ToList();
									//List <SystemVariableOTDto> systemVariableOTDto = (List<SystemVariableOTDto>)EmpSettings;
									if (empSett != null && empSett.NormalOverTime > 0)
									{
										decimal OTHrs = empSett.NormalOverTime;
										decimal HOTHrs = empSett.HolidayOverTime;
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
														decimal Amt = 0;
														decimal Hrs = upperLimit - lowerLimit + 1;
														if ((int)item.ValueType == 1) //percentage
														{
															Amt = (Hrs * item.ValueVariable * empSett.NOTRate) / 100;
														}
														OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
														{
															NotHrs = Hrs,
															HotHrs = 0,
															SotHrs = 0,
															EmployeeId = emp.Id,
															EmployeeCode = emp.EmployeeCode,
															EmployeeName = emp.EmployeeName,
															NotRate = empSett.NOTRate,
															HotRate = 0,
															SotRate = 0,
															ComponentId = empSett.NOTComponentID,
															NotAmount = Amt,
															HotAmount = 0,
															SotAmount = 0,
															OverTimeId = 0,
														};
														overTimePayrollViewModel.Add(overTimeViewModel);
													}
													else
													{
														decimal Amt = 0;
														decimal Hrs = OTHrs - lowerLimit + 1;
														if ((int)item.ValueType == 1) //percentage
														{
															Amt = (Hrs * item.ValueVariable * empSett.NOTRate) / 100;
														}
														OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
														{
															NotHrs = Hrs,
															HotHrs = 0,
															SotHrs = 0,
															EmployeeId = emp.Id,
															EmployeeCode = emp.EmployeeCode,
															EmployeeName = emp.EmployeeName,
															NotRate = empSett.NOTRate,
															HotRate = 0,
															SotRate = 0,
															ComponentId = empSett.NOTComponentID,
															NotAmount = Amt,
															HotAmount = 0,
															SotAmount = 0,
															OverTimeId = 0,
														};
														overTimePayrollViewModel.Add(overTimeViewModel);
													}
												}
											}
											if (item.OverTimeType == (int)OverTimeType.SpecialOvertime)
											{
												if (OTHrs > item.LowerLimit)
												{

													if (OTHrs > item.UpperLimit)
													{
														decimal Amt = 0;
														decimal Hrs = upperLimit - lowerLimit + 1;
														if ((int)item.ValueType == 1) //percentage
														{
															Amt = (Hrs * item.ValueVariable * empSett.SOTRate) / 100;
														}
														OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
														{
															NotHrs = 0,
															HotHrs = 0,
															SotHrs = Hrs,
															EmployeeId = emp.Id,
															EmployeeCode = emp.EmployeeCode,
															EmployeeName = emp.EmployeeName,
															NotRate = 0,
															HotRate = 0,
															SotRate = empSett.SOTRate,
															ComponentId = empSett.SOTComponentID,
															NotAmount = 0,
															HotAmount = 0,
															SotAmount = Amt,
															OverTimeId = 0,
														};
														overTimePayrollViewModel.Add(overTimeViewModel);
													}
													else
													{
														decimal Amt = 0;
														decimal Hrs = OTHrs - lowerLimit + 1;
														if ((int)item.ValueType == 1) //percentage
														{
															Amt = (Hrs * item.ValueVariable * empSett.SOTRate) / 100;
														}
														OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
														{
															NotHrs = 0,
															HotHrs = 0,
															SotHrs = Hrs,
															EmployeeId = emp.Id,
															EmployeeCode = emp.EmployeeCode,
															EmployeeName = emp.EmployeeName,
															NotRate = 0,
															HotRate = 0,
															SotRate = empSett.SOTRate,
															ComponentId = empSett.SOTComponentID,
															NotAmount = 0,
															HotAmount = 0,
															SotAmount = Amt,
															OverTimeId = 0,
														};
														overTimePayrollViewModel.Add(overTimeViewModel);
													}
												}
											}
											if (HOTHrs > item.LowerLimit)
											{

												if (HOTHrs > item.UpperLimit)
												{
													decimal Amt = 0;
													decimal Hrs = upperLimit - lowerLimit + 1;
													if ((int)item.ValueType == 1) //percentage
													{
														Amt = (Hrs * item.ValueVariable * empSett.HOTRate) / 100;
													}
													OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
													{
														NotHrs = 0,
														HotHrs = Hrs,
														SotHrs = 0,
														EmployeeId = emp.Id,
														EmployeeCode = emp.EmployeeCode,
														EmployeeName = emp.EmployeeName,
														NotRate = 0,
														HotRate = empSett.HOTRate,
														SotRate = 0,
														ComponentId = empSett.HOTComponentID,
														NotAmount = 0,
														HotAmount = Amt,
														SotAmount = 0,
														OverTimeId = 0,
													};
													overTimePayrollViewModel.Add(overTimeViewModel);
												}
												else
												{
													decimal Amt = 0;
													decimal Hrs = HOTHrs - lowerLimit + 1;
													if ((int)item.ValueType == 1) //percentage
													{
														Amt = (Hrs * item.ValueVariable * empSett.HOTRate) / 100;
													}
													OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
													{
														NotHrs = 0,
														HotHrs = Hrs,
														SotHrs = 0,
														EmployeeId = emp.Id,
														EmployeeCode = emp.EmployeeCode,
														EmployeeName = emp.EmployeeName,
														NotRate = 0,
														HotRate = empSett.HOTRate,
														SotRate = 0,
														ComponentId = empSett.HOTComponentID,
														NotAmount = 0,
														HotAmount = Amt,
														SotAmount = 0,
														OverTimeId = 0,
													};
													overTimePayrollViewModel.Add(overTimeViewModel);
												}
											}
										}

									}
								}
								//need to find sum of daily ot
								//systemVariableValues_not = systemVariableValues_not.GroupBy(x => x.EmployeeId)
								//   .Select(g => new SystemVariableValues { EmployeeId = g.Key, TransValue = g.Sum(x => x.TransValue) })
								//   .ToList();
							}

						}
						else
						{
							sql = @"SELECT
							OTC.normalovertime AS NOTComponentID ,
							OTC.specialovertime AS SOTComponentID,
							OTC.holidayovertime AS HOTComponentID,
							SUM(OT.normalovertime) AS normalovertime,SUM(OT.specialovertime) AS specialovertime,
							SUM(OT.holidayovertime) AS holidayovertime,escd.monthlyamount AS notrate,escd1.monthlyamount AS sotrate,escd2.monthlyamount AS hotrate
							FROM hrms.overtime OT
							INNER JOIN hrms.overtimepolicyconfiguration OTC ON OTC.overtimepolicyid = OT.overtimepolicyid

							LEFT JOIN hrms.payrollcomponent PC ON PC.id = OTC.normalovertime
		                    LEFT JOIN hrms.employeesalaryconfigurationdetails escd ON escd.payrollcomponentid = PC.id

							LEFT JOIN hrms.payrollcomponent PC1 ON PC1.id = OTC.specialovertime
		                    LEFT JOIN hrms.employeesalaryconfigurationdetails escd1 ON escd1.payrollcomponentid = PC1.id

							LEFT JOIN hrms.payrollcomponent PC2 ON PC2.id = OTC.holidayovertime
		                    LEFT JOIN hrms.employeesalaryconfigurationdetails escd2 ON escd2.payrollcomponentid = PC2.id

							WHERE  OT.requeststatus=4  AND OT.employeeid = @employeeid AND OT.overtimepolicyid = @overtimepolicyid
							AND To_date(Cast(OT.todate AS TEXT), 'YYYY-MM-DD') BETWEEN To_date(Cast(@fromDate AS TEXT), 'YYYY-MM-DD') AND To_date(Cast(@toDate AS TEXT), 'YYYY-MM-DD')
							GROUP BY OTC.normalovertime ,
							OTC.specialovertime ,
							OTC.holidayovertime ,escd.monthlyamount,escd1.monthlyamount ,escd2.monthlyamount ";

							var EmpSettings = await Connection.QueryAsync<OTDetails>(sql, new
							{
								fromDate,
								toDate,
								employeeid = emp.Id,
								overtimepolicyid = emp.OverTimePolicyId
							});

							decimal NotAmt = 0,HotAmt=0, SotAmt=0; 
							decimal NotHrs =0,HotHrs = 0, SotHrs = 0;
							decimal NotRate = 0, HotRate = 0, SotRate = 0;
							if (EmpSettings != null && EmpSettings.ToList().Count > 0)
							{
								NotHrs = EmpSettings.ToList().Select(x => x.NormalOverTime).FirstOrDefault();
								HotHrs = EmpSettings.ToList().Select(x => x.HolidayOverTime).FirstOrDefault();
								SotHrs = EmpSettings.ToList().Select(x => x.SpecialOverTime).FirstOrDefault();
								NotRate = EmpSettings.ToList().Select(x => x.NOTRate).FirstOrDefault();
								HotRate = EmpSettings.ToList().Select(x => x.HOTRate).FirstOrDefault();
								SotRate = EmpSettings.ToList().Select(x => x.SOTRate).FirstOrDefault();
								NotAmt = NotHrs*NotRate; 
								HotAmt = HotHrs*HotRate;
								SotAmt = SotHrs*SotRate;
								if (NotHrs > 0)
								{
									OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
									{
										NotHrs = NotHrs,
										HotHrs = 0,
										SotHrs = 0,
										EmployeeId = emp.Id,
										EmployeeCode = emp.EmployeeCode,
										EmployeeName = emp.EmployeeName,
										NotRate = NotRate,
										HotRate = 0,
										SotRate = 0,
										ComponentId = EmpSettings.ToList().Select(x => x.NOTComponentID).FirstOrDefault(),
										NotAmount = NotAmt,
										HotAmount = 0,
										SotAmount = 0,
										OverTimeId = 0,
									};
									overTimePayrollViewModel.Add(overTimeViewModel);
								}
								if (SotHrs > 0)
								{
									OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
									{
										NotHrs = SotHrs,
										HotHrs = 0,
										SotHrs = 0,
										EmployeeId = emp.Id,
										EmployeeCode = emp.EmployeeCode,
										EmployeeName = emp.EmployeeName,
										NotRate = SotRate,
										HotRate = 0,
										SotRate = 0,
										ComponentId = EmpSettings.ToList().Select(x => x.SOTComponentID).FirstOrDefault(),
										NotAmount = SotAmt,
										HotAmount = 0,
										SotAmount = 0,
										OverTimeId = 0,
									};
									overTimePayrollViewModel.Add(overTimeViewModel);
								}
								if (HotHrs > 0)
								{
									OverTimePayrollViewModel overTimeViewModel = new OverTimePayrollViewModel
									{
										NotHrs = HotHrs,
										HotHrs = 0,
										SotHrs = 0,
										EmployeeId = emp.Id,
										EmployeeCode = emp.EmployeeCode,
										EmployeeName = emp.EmployeeName,
										NotRate = HotRate,
										HotRate = 0,
										SotRate = 0,
										ComponentId = EmpSettings.ToList().Select(x => x.HOTComponentID).FirstOrDefault(),
										NotAmount = HotAmt,
										HotAmount = 0,
										SotAmount = 0,
										OverTimeId = 0,
									};
									overTimePayrollViewModel.Add(overTimeViewModel);
								}
							}
						}

					}
				}
				//sum of system var values based on employeeid

				//dd = await bulkUploadRepository.BulkInsertSystemVariableValues(systemVariableValues_not);
			}
			catch (Exception)
			{
				throw;
			}
			#endregion


			return overTimePayrollViewModel;
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

        public async Task<OverTimeDetailsView> GetOvertimeByEmployeeCode(string employeeCode)
        {
            string sql = @"SELECT * FROM hrms.jobdetails jd
						 INNER JOIN  hrms.jobfiling jf
						 ON jf.employeeid = jd.employeeid
                         WHERE jd.employeenumber = @employeeCode
						 AND jd.isarchived = false";

            return await Connection.QueryFirstOrDefaultAsync<OverTimeDetailsView>(sql, new { employeeCode });
        }
    }
}
