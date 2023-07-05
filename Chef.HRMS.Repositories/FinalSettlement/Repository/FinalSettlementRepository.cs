using Chef.Common.Models;
using Chef.HRMS.Models;
using Chef.HRMS.Types;

namespace Chef.HRMS.Repositories.FinalSettlement
{
    public class FinalSettlementRepository : TenantRepository<Chef.HRMS.Models.FinalSettlement>, IFinalSettlementRepository
    {
        private readonly ILeaveEligibilityRepository leaveEligibility;
        public FinalSettlementRepository(IHttpContextAccessor httpContextAccessor, ITenantConnectionFactory session,
            ILeaveEligibilityRepository leaveEligibility) : base(httpContextAccessor, session)
        {
            this.leaveEligibility = leaveEligibility;
        }

        public async Task<decimal> GetEOSBalanceDays(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId)
        {
            var sql = @"SELECT accrualdays
                        FROM hrms.eosaccrualsummary
                        WHERE accrualdate BETWEEN @CutOffDateFrom AND @CutOffDateTo
                        AND employeeid = @employeeid";

            return await Connection.QueryFirstOrDefaultAsync<decimal>(sql, new { CutOffDateFrom, CutOffDateTo, employeeId });
        }

        public async Task<decimal> GetFinalLeaveBalance(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId)
        {
            var sql = @"SELECT (SELECT
                            SUM(accrualdays)
                          FROM hrms.leaveaccrualsummary
                          WHERE accrualdate BETWEEN @CutOffDateFrom AND @CutOffDateTo
                          AND employeeid = @employeeId)
                          - (SELECT
                            SUM(availdays)
                          FROM hrms.leaveaccrualsummary
                          WHERE accrualdate BETWEEN @CutOffDateFrom AND @CutOffDateTo
                          AND employeeid = @employeeId)
                          AS balanceannualleaves";

            return await Connection.QueryFirstOrDefaultAsync<decimal>(sql, new { CutOffDateFrom, CutOffDateTo, employeeId });
        }

        public async Task<decimal> GetFinalTicketAmountBalance(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId)
        {
            var sql = @"SELECT accrualamount
                        FROM hrms.ticketaccrualsummary
                        WHERE accrualdate BETWEEN @CutOffDateFrom AND @CutOffDateTo
                        AND employeeid = @employeeid";

            return await Connection.QueryFirstOrDefaultAsync<decimal>(sql, new { CutOffDateFrom, CutOffDateTo, employeeId });
        }

        public async Task<IEnumerable<FinalSettlementComponetsView>> GetPayrollComponents(int employeeId)
        {
            var sql = @"SELECT DISTINCT
                          pc.ordernumber,
                          pc.id AS payrollcomponentid,
                          pc.shortcode,
                          pc.name,
                          escd.monthlyamount
                        FROM hrms.jobfiling jf
                        INNER JOIN hrms.employeesalaryconfigurationdetails escd
                          ON jf.payrollstructureid = escd.payrollstructureid
                        INNER JOIN hrms.payrollcomponent pc
                          ON escd.payrollcomponentid = pc.id
                        WHERE jf.employeeid = @employeeId
                        ORDER BY pc.ordernumber ASC";

            return await Connection.QueryAsync<FinalSettlementComponetsView>(sql, new { employeeId });
        }

        public async Task<IEnumerable<LOPCalculationView>> GetLeaveComponents(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId)
        {
            try
            {
                List<LOPCalculationView> lOPCalculationView = new List<LOPCalculationView>();

                string sql = @"SELECT
                                  JF.employeeid,
                                  PG.leavecutoff,
                                  JF.payrollstructureid
                                FROM hrms.jobfiling JF
                                INNER JOIN hrms.hrmsemployee EM
                                  ON JF.employeeid = EM.id
                                INNER JOIN hrms.paygroup PG
                                  ON PG.id = JF.paygroupid
                                WHERE EM.id = @employeeId
                                AND JF.isarchived = FALSE
                                AND EM.isarchived = FALSE";

                var EmpList = await Connection.QueryAsync<LOPEmployee>(sql, new { employeeId });

                if (EmpList != null && EmpList.ToList().Count > 0)
                {
                    foreach (LOPEmployee item in EmpList)
                    {
                        sql = @"SELECT
                                  LD.leavecomponentid,
                                  COUNT(CASE
                                    WHEN LD.leavetype = 1 THEN LD.leavetype
                                  END) + COUNT(CASE
                                    WHEN LD.leavetype = 2 THEN LD.leavetype
                                  END) * .5 AS Days
                                FROM hrms.leavedetails LD
                                WHERE LD.employeeid = @employeeId
                                AND LD.isarchived = FALSE
                                AND LD.leavestatus = 4
                                AND To_date(CAST(LD.leavedate AS text), 'YYYY-MM-DD') BETWEEN @CutOffDateFrom AND @CutOffDateTo
                                GROUP BY LD.leavecomponentid";

                        var LeaveDet = await Connection.QueryAsync<LOPDetails>(sql, new { employeeid = item.EmployeeId, CutOffDateFrom, CutOffDateTo });

                        if (LeaveDet != null && LeaveDet.ToList().Count > 0)
                        {
                            foreach (LOPDetails detail in LeaveDet)
                            {
                                //need to find leave cut off type based on leave component -- from leaveeligiblity -- entry not properly going on update
                                var leaveCutOff = await leaveEligibility.GetLeaveConfiguration(detail.LeaveComponentId);
                                int lCutOff = (int)leaveCutOff.Select(x => x.LeaveCutOffType).ToList().FirstOrDefault();
                                //yearEnd = 1,MonthEnd = 2,QuarterEnd = 3,HalfYearEnd = 4,NotApplicable = 5

                                //need to find tot leaves based on leave cut off 

                                int Year = CutOffDateTo.Year;
                                int Month = CutOffDateTo.Month;
                                int Date = CutOffDateTo.Day;

                                DateTime YearStart = new DateTime(Year - 1, 12, Date);
                                DateTime QStart = new DateTime(Year - 1, 12, Date);
                                DateTime QEnd = new DateTime(Year, 3, Date);
                                switch (Month)
                                {
                                    case 1:
                                    case 2:
                                    case 3:
                                        QStart = new DateTime(Year - 1, 12, Date);
                                        QEnd = new DateTime(Year, 3, Date);
                                        break;
                                    case 4:
                                    case 5:
                                    case 6:
                                        QStart = new DateTime(Year, 3, Date);
                                        QEnd = new DateTime(Year, 6, Date);
                                        break;
                                    case 7:
                                    case 8:
                                    case 9:
                                        QStart = new DateTime(Year, 6, Date);
                                        QEnd = new DateTime(Year, 9, Date);
                                        break;
                                    case 10:
                                    case 11:
                                    case 12:
                                        QStart = new DateTime(Year, 9, Date);
                                        QEnd = new DateTime(Year, 12, Date);
                                        break;
                                }

                                DateTime HStart = new DateTime(Year - 1, 12, Date);
                                DateTime HEnd = new DateTime(Year, 6, Date);
                                switch (Month)
                                {
                                    case 1:
                                    case 2:
                                    case 3:
                                    case 4:
                                    case 5:
                                    case 6:
                                        QStart = new DateTime(Year - 1, 12, Date);
                                        QEnd = new DateTime(Year, 6, Date);
                                        break;
                                    case 7:
                                    case 8:
                                    case 9:
                                    case 10:
                                    case 11:
                                    case 12:
                                        QStart = new DateTime(Year, 6, Date);
                                        QEnd = new DateTime(Year, 12, Date);
                                        break;
                                }
                                switch (lCutOff)
                                {
                                    case 1:
                                        sql = @"SELECT
                                                  LD.leavecomponentid,
                                                  lc.code AS leavecomponentcode,
                                                  lc.description AS leavecomponentname,
                                                  COUNT(CASE
                                                    WHEN LD.leavetype = 1 THEN LD.leavetype
                                                  END) + COUNT(CASE
                                                    WHEN LD.leavetype = 2 THEN LD.leavetype
                                                  END) * .5 AS Days
                                                FROM hrms.leavedetails LD
                                                INNER JOIN hrms.leavecomponent lc
						                          ON LD.leavecomponentid = lc.id
                                                WHERE LD.employeeid = @employeeid
                                                AND LD.isarchived = FALSE
                                                AND LD.leavestatus = 4
                                                AND LD.leaveComponentid = @leaveComponentid
                                                AND To_date(CAST(LD.leavedate AS text), 'YYYY-MM-DD') BETWEEN @YearStart AND @CutOffDateTo
                                                GROUP BY LD.leavecomponentid,lc.code,lc.description";
                                        break;

                                    case 2:
                                        sql = @"SELECT
                                                  LD.leavecomponentid,
                                                  lc.code AS leavecomponentcode,
                                                  lc.description AS leavecomponentname,
                                                  COUNT(CASE
                                                    WHEN LD.leavetype = 1 THEN LD.leavetype
                                                  END) + COUNT(CASE
                                                    WHEN LD.leavetype = 2 THEN LD.leavetype
                                                  END) * .5 AS Days
                                                FROM hrms.leavedetails LD
                                                INNER JOIN hrms.leavecomponent lc
						                          ON LD.leavecomponentid = lc.id
                                                WHERE LD.employeeid = @employeeid
                                                AND LD.isarchived = FALSE
                                                AND LD.leavestatus = 4
                                                AND LD.leaveComponentid = @leaveComponentid
                                                AND To_date(CAST(LD.leavedate AS text), 'YYYY-MM-DD') BETWEEN @CutOffDateFrom AND @CutOffDateTo
                                                GROUP BY LD.leavecomponentid,lc.code,lc.description";
                                        break;

                                    case 3:
                                        sql = @"SELECT
                                                  LD.leavecomponentid,
                                                  lc.code AS leavecomponentcode,
                                                  lc.description AS leavecomponentname,
                                                  COUNT(CASE
                                                    WHEN LD.leavetype = 1 THEN LD.leavetype
                                                  END) + COUNT(CASE
                                                    WHEN LD.leavetype = 2 THEN LD.leavetype
                                                  END) * .5 AS Days
                                                FROM hrms.leavedetails LD
                                                INNER JOIN hrms.leavecomponent lc
						                          ON LD.leavecomponentid = lc.id
                                                WHERE LD.employeeid = @employeeid
                                                AND LD.isarchived = FALSE
                                                AND LD.leavestatus = 4
                                                AND LD.leaveComponentid = @leaveComponentid
                                                AND To_date(CAST(LD.leavedate AS text), 'YYYY-MM-DD') BETWEEN @QStart AND @QEnd
                                                GROUP BY LD.leavecomponentid,lc.code,lc.description";
                                        break;

                                    case 4:
                                        sql = @"SELECT
                                                  LD.leavecomponentid,
                                                  lc.code AS leavecomponentcode,
                                                  lc.description AS leavecomponentname,
                                                  COUNT(CASE
                                                    WHEN LD.leavetype = 1 THEN LD.leavetype
                                                  END) + COUNT(CASE
                                                    WHEN LD.leavetype = 2 THEN LD.leavetype
                                                  END) * .5 AS Days
                                                FROM hrms.leavedetails LD
                                                INNER JOIN hrms.leavecomponent lc
						                          ON LD.leavecomponentid = lc.id
                                                WHERE LD.employeeid = @employeeid
                                                AND LD.isarchived = FALSE
                                                AND LD.leavestatus = 4
                                                AND LD.leaveComponentid = @leaveComponentid
                                                AND To_date(CAST(LD.leavedate AS text), 'YYYY-MM-DD') BETWEEN @HStart AND @HEnd
                                                GROUP BY LD.leavecomponentid,lc.code,lc.description";
                                        break;

                                    case 5:
                                        sql = @"SELECT
                                                  LD.leavecomponentid,
                                                  lc.code AS leavecomponentcode,
                                                  lc.description AS leavecomponentname,
                                                  COUNT(CASE
                                                    WHEN LD.leavetype = 1 THEN LD.leavetype
                                                  END) + COUNT(CASE
                                                    WHEN LD.leavetype = 2 THEN LD.leavetype
                                                  END) * .5 AS Days
                                                FROM hrms.leavedetails LD
                                                INNER JOIN hrms.leavecomponent lc
						                          ON LD.leavecomponentid = lc.id
                                                WHERE LD.employeeid = @employeeid
                                                AND LD.isarchived = FALSE
                                                AND LD.leavestatus = 4
                                                AND LD.leaveComponentid = @leaveComponentid
                                                AND To_date(CAST(LD.leavedate AS text), 'YYYY-MM-DD') BETWEEN @YearStart AND @CutOffDateTo
                                                GROUP BY LD.leavecomponentid,lc.code,lc.description";
                                        break;
                                        //To do month wise,quarter, half year
                                }
                                var LeaveTypeDet = await Connection.QueryAsync<LOPDetails>(sql, new
                                {
                                    employeeid = item.EmployeeId,
                                    CutOffDateFrom,
                                    CutOffDateTo,
                                    QStart,
                                    QEnd,
                                    HStart,
                                    HEnd,
                                    leaveComponentid = detail.LeaveComponentId,
                                    YearStart
                                });
                                decimal TotLeaveCount = LeaveTypeDet.ToList().Select(x => x.Days).FirstOrDefault();
                                decimal CurrentLeaves = detail.Days;
                                decimal SlabStart = TotLeaveCount - CurrentLeaves + 1;
                                string leaveComponentCode = LeaveTypeDet.ToList().Select(x=> x.LeaveComponentCode).FirstOrDefault();
                                string leaveComponentName = LeaveTypeDet.ToList().Select(x => x.LeaveComponentName).FirstOrDefault();

                                sql = @"SELECT
                                          PC.maximumlimit,
                                          PC.payrollcomponentid
                                        FROM hrms.leavecomponentlopdetails LCD
                                        INNER JOIN hrms.payrollcomponentconfiguration PC
                                          ON PC.payrollcomponentid = LCD.payrollcomponentid
                                        INNER JOIN hrms.payrollcomponent CM
                                          ON CM.id = PC.payrollcomponentid
                                        WHERE LCD.leavecomponentid = @leavecomponentid
                                        AND PC.isarchived = FALSE
                                        AND CM.isarchived = FALSE
                                        AND PC.payrollstructureid = @payrollstructureid";

                                var payrollComp = await Connection.QueryAsync<LOPPayrollComponent>(sql, new { leavecomponentid = detail.LeaveComponentId, item.PayrollStructureId });

                                if (payrollComp != null && payrollComp.ToList().Count > 0)
                                {
                                    decimal DedAmt = 0;
                                    foreach (LOPPayrollComponent comp in payrollComp)
                                    {
                                        //need to find the slab on the current month

                                        sql = @"SELECT
                                                  LS.lowerlimit,
                                                  LS.upperlimit,
                                                  LS.valuetype,
                                                  LS.valuevariable
                                                FROM hrms.leaveslab LS
                                                WHERE LS.leavecomponentid = @leavecomponentid
                                                AND LS.isarchived = FALSE";

                                        var leaveSlabs = await Connection.QueryAsync<LeaveSlab>(sql, new { leavecomponentid = detail.LeaveComponentId });

                                        if (leaveSlabs != null && leaveSlabs.ToList().Count > 0)
                                        {
                                            foreach (LeaveSlab slab in leaveSlabs)
                                            {
                                                if (SlabStart >= slab.LowerLimit)
                                                {
                                                    if (TotLeaveCount > slab.UpperLimit)
                                                    {
                                                        SlabStart = slab.UpperLimit + 1;
                                                        Decimal SlabCount = slab.UpperLimit - SlabStart + 1;
                                                        DedAmt += (SlabCount * slab.ValueVariable * comp.MaximumLimit) / 100;
                                                    }
                                                    else
                                                    {
                                                        Decimal SlabCount = SlabStart - slab.LowerLimit - 1;
                                                        DedAmt += (SlabCount * slab.ValueVariable * comp.MaximumLimit) / 100;
                                                    }
                                                }
                                            }
                                        }
                                        else
                                        {
                                            DedAmt += (CurrentLeaves * comp.MaximumLimit);

                                        }
                                        LOPCalculationView details = new LOPCalculationView
                                        {

                                            LOPCount = (int)CurrentLeaves,
                                            EmployeeId = item.EmployeeId,
                                            MonthlyAmount = (double)comp.MaximumLimit,
                                            PayrollComponentId = comp.PayrollComponentId,
                                            LeaveComponentCode = leaveComponentCode,
                                            LeaveComponentName = leaveComponentName,
                                            LeaveId = detail.LeaveComponentId,
                                            TotalAmount = (double)DedAmt
                                        };
                                        lOPCalculationView.Add(details);
                                    }
                                }
                                else
                                {
                                    throw new Exception("Leave component not set up for the leave type!");
                                }
                            }
                        }
                    }
                }
                return lOPCalculationView;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<IEnumerable<OverTimePayrollViewModel>> GetOverTimeComponents(DateTime CutOffDateFrom, DateTime CutOffDateTo, int employeeId)
        {
            List<OverTimePayrollViewModel> overTimePayrollViewModel = new List<OverTimePayrollViewModel>();
            #region slabOT
            try
            {
               var sql = @"SELECT
                              hm.id,
                              jf.overtimepolicyid,
                              OTC.isovertimeslab,
                              OTC.ismonthly,
                              JD.employeenumber AS EmployeeCode,
                              hm.firstname AS EmployeeName
                            FROM hrms.hrmsemployee hm
                            INNER JOIN hrms.jobfiling jf
                              ON hm.id = jf.employeeid
                            INNER JOIN hrms.overtimepolicyconfiguration OTC
                              ON OTC.overtimepolicyid = jf.overtimepolicyid
                            INNER JOIN hrms.jobdetails JD
                              ON JD.employeeid = hm.id
                            WHERE jf.employeeid = @employeeId
                            AND hm.isarchived = FALSE
                            AND jf.isarchived = FALSE";

                var empList = await Connection.QueryAsync<OTEmployeeDetails>(sql, new
                {
                    employeeId
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
                                          OTC.normalovertime AS NOTComponentID,
                                          OTC.specialovertime AS SOTComponentID,
                                          OTC.holidayovertime AS HOTComponentID,
                                          SUM(OT.normalovertime) AS normalovertime,
                                          SUM(OT.specialovertime) AS specialovertime,
                                          SUM(OT.holidayovertime) AS holidayovertime,
                                          escd.monthlyamount AS notrate,
                                          escd1.monthlyamount AS sotrate,
                                          escd2.monthlyamount AS hotrate
                                        FROM hrms.overtime OT
                                        INNER JOIN hrms.overtimepolicyconfiguration OTC
                                          ON OTC.overtimepolicyid = OT.overtimepolicyid
                                        LEFT JOIN hrms.payrollcomponent PC
                                          ON PC.id = OTC.normalovertime
                                        LEFT JOIN hrms.employeesalaryconfigurationdetails escd
                                          ON escd.payrollcomponentid = PC.id
                                        LEFT JOIN hrms.payrollcomponent PC1
                                          ON PC1.id = OTC.specialovertime
                                        LEFT JOIN hrms.employeesalaryconfigurationdetails escd1
                                          ON escd1.payrollcomponentid = PC1.id
                                        LEFT JOIN hrms.payrollcomponent PC2
                                          ON PC2.id = OTC.holidayovertime
                                        LEFT JOIN hrms.employeesalaryconfigurationdetails escd2
                                          ON escd2.payrollcomponentid = PC2.id
                                        WHERE OT.requeststatus = 4
                                        AND OT.employeeid = @employeeid
                                        AND OT.overtimepolicyid = @overtimepolicyid
                                        AND To_date(CAST(OT.todate AS text), 'YYYY-MM-DD') BETWEEN To_date(CAST(@CutOffDateFrom AS text), 'YYYY-MM-DD') AND To_date(CAST(@CutOffDateTo AS text), 'YYYY-MM-DD')
                                        GROUP BY OTC.normalovertime,
                                                 OTC.specialovertime,
                                                 OTC.holidayovertime,
                                                 escd.monthlyamount,
                                                 escd1.monthlyamount,
                                                 escd2.monthlyamount ";

                                var EmpSettings = await Connection.QueryAsync<OTDetails>(sql, new
                                {
                                    CutOffDateFrom,
                                    CutOffDateTo,
                                    employeeid = emp.Id,
                                    overtimepolicyid = emp.OverTimePolicyId
                                });

                                sql = @"SELECT
                                          OTS.lowerlimit,
                                          OTS.upperlimit,
                                          OTS.overtimetype,
                                          OTS.valuetype,
                                          OTS.valuevariable
                                        FROM hrms.overtimeslab OTS
                                        WHERE OTS.overtimepolicyid = @overtimepolicyid
                                        AND OTS.isarchived = FALSE
                                        ORDER BY OTS.overtimetype";

                                var oTSlab = await Connection.QueryAsync<OverTimeSlab>(sql, new
                                {
                                    overtimepolicyid = emp.OverTimePolicyId
                                });

                                var row = EmpSettings.ToList().FirstOrDefault(x => x.NormalOverTime != 0);
                                if (row != null && row.NormalOverTime > 0 || row != null && row.HolidayOverTime > 0)
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

                                          OTC.normalovertime AS NOTComponentID,
                                          OTC.specialovertime AS SOTComponentID,
                                          OTC.holidayovertime AS HOTComponentID,
                                          OT.normalovertime AS normalovertime,
                                          OT.specialovertime AS specialovertime,
                                          OT.holidayovertime AS holidayovertime,
                                          escd.monthlyamount AS notrate,
                                          escd1.monthlyamount AS sotrate,
                                          escd2.monthlyamount AS hotrate
                                        FROM hrms.overtime OT
                                        INNER JOIN hrms.overtimepolicyconfiguration OTC
                                          ON OTC.overtimepolicyid = OT.overtimepolicyid
                                        LEFT JOIN hrms.payrollcomponent PC
                                          ON PC.id = OTC.normalovertime
                                        LEFT JOIN hrms.employeesalaryconfigurationdetails escd
                                          ON escd.payrollcomponentid = PC.id
                                        LEFT JOIN hrms.payrollcomponent PC1
                                          ON PC1.id = OTC.specialovertime
                                        LEFT JOIN hrms.employeesalaryconfigurationdetails escd1
                                          ON escd1.payrollcomponentid = PC1.id
                                        LEFT JOIN hrms.payrollcomponent PC2
                                          ON PC2.id = OTC.holidayovertime
                                        LEFT JOIN hrms.employeesalaryconfigurationdetails escd2
                                          ON escd2.payrollcomponentid = PC2.id
                                        WHERE OT.requeststatus = 4
                                        AND OT.employeeid = @employeeid
                                        AND OT.overtimepolicyid = @overtimepolicyid
                                        AND To_date(CAST(OT.todate AS text), 'YYYY-MM-DD') BETWEEN To_date(CAST(@CutOffDateFrom AS text), 'YYYY-MM-DD') AND To_date(CAST(@CutOffDateTo AS text), 'YYYY-MM-DD')";

                                var EmpSettings = await Connection.QueryAsync<OTDetails>(sql, new
                                {
                                    CutOffDateFrom,
                                    CutOffDateTo,
                                    employeeid = emp.Id,
                                    overtimepolicyid = emp.OverTimePolicyId
                                });

                                foreach (OTDetails empSett in EmpSettings)
                                {
                                    sql = @"SELECT
                                              MIN(lowerlimit) AS lowerlimit,
                                              MAX(upperlimit) AS upperlimit,
                                              OTS.overtimetype
                                            FROM hrms.overtimeslab OTS
                                            WHERE OTS.overtimepolicyid = @overtimepolicyid
                                            GROUP BY OTS.overtimetype
                                            ORDER BY OTS.overtimetype";

                                    var oTSlab = await Connection.QueryAsync<OverTimeSlab>(sql, new
                                    {
                                        overtimepolicyid = emp.OverTimePolicyId
                                    });

                                    if (oTSlab != null || oTSlab.ToList().Count == 0)
                                    {
                                        throw new Exception("Slab is not set");
                                    }
                                    List<SystemVariableOTDto> systemVariableOTDto = (List<SystemVariableOTDto>)EmpSettings;
                                    
                                    //List<OTDetails> empSettings = (List<OTDetails>)EmpSettings;
                                    //List<SystemVariableOTDto> systemVariableOTDto = empSettings.Select(item => new SystemVariableOTDto
                                    //{
                                    //    Nml_SystemVariableId = item.NOTComponentID,
                                    //                               Sp_OtSystemVariableId = item.SOTComponentID,
                                    //    Hd_OtSystemVariableId = item.HOTComponentID
                                    //                           }).ToList();
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
                                      OTC.normalovertime AS NOTComponentID,
                                      OTC.specialovertime AS SOTComponentID,
                                      OTC.holidayovertime AS HOTComponentID,
                                      SUM(OT.normalovertime) AS normalovertime,
                                      SUM(OT.specialovertime) AS specialovertime,
                                      SUM(OT.holidayovertime) AS holidayovertime,
                                      escd.monthlyamount AS notrate,
                                      escd1.monthlyamount AS sotrate,
                                      escd2.monthlyamount AS hotrate
                                    FROM hrms.overtime OT
                                    INNER JOIN hrms.overtimepolicyconfiguration OTC
                                      ON OTC.overtimepolicyid = OT.overtimepolicyid
                                    LEFT JOIN hrms.payrollcomponent PC
                                      ON PC.id = OTC.normalovertime
                                    LEFT JOIN hrms.employeesalaryconfigurationdetails escd
                                      ON escd.payrollcomponentid = PC.id
                                    LEFT JOIN hrms.payrollcomponent PC1
                                      ON PC1.id = OTC.specialovertime
                                    LEFT JOIN hrms.employeesalaryconfigurationdetails escd1
                                      ON escd1.payrollcomponentid = PC1.id
                                    LEFT JOIN hrms.payrollcomponent PC2
                                      ON PC2.id = OTC.holidayovertime
                                    LEFT JOIN hrms.employeesalaryconfigurationdetails escd2
                                      ON escd2.payrollcomponentid = PC2.id
                                    WHERE OT.requeststatus = 4
                                    AND OT.employeeid = @employeeid
                                    AND OT.overtimepolicyid = @overtimepolicyid
                                    AND To_date(CAST(OT.todate AS text), 'YYYY-MM-DD') BETWEEN To_date(CAST(@CutOffDateFrom AS text), 'YYYY-MM-DD') AND To_date(CAST(@CutOffDateTo AS text), 'YYYY-MM-DD')
                                    GROUP BY OTC.normalovertime,
                                             OTC.specialovertime,
                                             OTC.holidayovertime,
                                             escd.monthlyamount,
                                             escd1.monthlyamount,
                                             escd2.monthlyamount ";

                            var EmpSettings = await Connection.QueryAsync<OTDetails>(sql, new
                            {
                                CutOffDateFrom,
                                CutOffDateTo,
                                employeeid = emp.Id,
                                overtimepolicyid = emp.OverTimePolicyId
                            });

                            decimal NotAmt = 0, HotAmt = 0, SotAmt = 0;
                            decimal NotHrs = 0, HotHrs = 0, SotHrs = 0;
                            decimal NotRate = 0, HotRate = 0, SotRate = 0;
                            if (EmpSettings != null && EmpSettings.ToList().Count > 0)
                            {
                                NotHrs = EmpSettings.ToList().Select(x => x.NormalOverTime).FirstOrDefault();
                                HotHrs = EmpSettings.ToList().Select(x => x.HolidayOverTime).FirstOrDefault();
                                SotHrs = EmpSettings.ToList().Select(x => x.SpecialOverTime).FirstOrDefault();
                                NotRate = EmpSettings.ToList().Select(x => x.NOTRate).FirstOrDefault();
                                HotRate = EmpSettings.ToList().Select(x => x.HOTRate).FirstOrDefault();
                                SotRate = EmpSettings.ToList().Select(x => x.SOTRate).FirstOrDefault();
                                NotAmt = NotHrs * NotRate;
                                HotAmt = HotHrs * HotRate;
                                SotAmt = SotHrs * SotRate;
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

        public async Task<DateTime> GetPreviousProcessDate(int employeeId)
        {
            var sql = @"SELECT payrollprocessdate
                        FROM hrms.payrollcomponentdetails
                        WHERE employeeid = @employeeId
                            AND isarchived = false
                        ORDER BY payrollprocessdate DESC
                        LIMIT 1";

           return await Connection.QueryFirstAsync<DateTime>(sql, new { employeeId });
        }
    }
}
