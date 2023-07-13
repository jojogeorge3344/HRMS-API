using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Chef.HRMS.Services.PayrollProcessing.Interface;
using OfficeOpenXml.FormulaParsing.Excel.Functions.DateTime;
using SqlKata;
using System.Globalization;
using Chef.Common.Models;
using System.Drawing;
using Chef.HRMS.Types;
using Chef.Common.Exceptions;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace Chef.HRMS.Services.PayrollProcessing.Service
{
    public class LeaveAccrualService  : AsyncService<LeaveAccrual>, ILeaveAccrualService
    {
        private readonly ILeaveAccrualRepository leaveAccrualRepository;
        private readonly ILeaveAccrualSummaryRepository leaveAccrualSummaryRepository;
        private readonly IPayrollProcessingMethodRepository payrollProcessingMethodRepository;
        private readonly ISystemVariableValuesRepository systemVariableValuesRepository;

        public LeaveAccrualService(ILeaveAccrualRepository leaveAccrualRepository, IPayrollProcessingMethodRepository payrollProcessingMethodRepository,
            ILeaveAccrualSummaryRepository leaveAccrualSummaryRepository, ISystemVariableValuesRepository systemVariableValuesRepository)
        {
            this.leaveAccrualRepository = leaveAccrualRepository;
            this.payrollProcessingMethodRepository = payrollProcessingMethodRepository;
            this.leaveAccrualSummaryRepository = leaveAccrualSummaryRepository;
            this.systemVariableValuesRepository = systemVariableValuesRepository;
        }

        public async Task<int> GenerateLeaveAvailed(LeaveAccrual leaveAvailedDetails)
        {
            //Make an entry in the leave accrual table with value in availdays and availamount 
            //Make an entry in the leave accrual summary table - reducing the availdays from the accrueddays for specific employee
            //AvailAmount to be sent in the leaveAvailedDetails 

            LeaveAccrual employeeLeaveAccrual = new LeaveAccrual();
            LeaveAccrualSummary leaveAccrualSummary = new LeaveAccrualSummary();

            if (leaveAvailedDetails != null)
            {
                employeeLeaveAccrual.EmployeeId = leaveAvailedDetails.EmployeeId;
                employeeLeaveAccrual.AccrualStatus = 0; //Pending
                employeeLeaveAccrual.IsArchived = false;
                employeeLeaveAccrual.AvailAmount = 0;
                employeeLeaveAccrual.AvailDays = leaveAvailedDetails.AvailDays;
                employeeLeaveAccrual.LeaveId = leaveAvailedDetails.LeaveId;

                // Get previous accrual summary details for this employee
                DateTime now = DateTime.Now;
                var prevAccrualSummaryDetails = await leaveAccrualSummaryRepository.GetPreviousAccrualSummary(leaveAvailedDetails.EmployeeId);

                if (prevAccrualSummaryDetails != null)
                {
                    leaveAccrualSummary.EmployeeId = leaveAvailedDetails.EmployeeId;
                    leaveAccrualSummary.AvailDays = leaveAvailedDetails.AvailDays + prevAccrualSummaryDetails.AvailDays;
                    leaveAccrualSummary.AvailAmount = leaveAvailedDetails.AvailAmount;
                    leaveAccrualSummary.LeaveId = leaveAvailedDetails.LeaveId;
                    leaveAccrualSummary.AccrualDate = leaveAvailedDetails.AccrualDate;
                    leaveAccrualSummary.AccrualDays = prevAccrualSummaryDetails.AccrualDays - leaveAvailedDetails.AvailDays;
                    leaveAccrualSummary.AccrualAmount = prevAccrualSummaryDetails.AccrualAmount - leaveAvailedDetails.AvailAmount;
                }
                var result = await leaveAccrualRepository.InsertAsync(employeeLeaveAccrual);
                return await leaveAccrualSummaryRepository.InsertAsync(leaveAccrualSummary);
            }
            else
            {
                throw new ResourceNotFoundException("Leave availed details is null.");
            }

        }

        public async Task<IEnumerable<LeaveAccrual>> GenerateLeaveAccruals(int paygroupid)
        {
            List<LeaveAccrual> leaveAccruals = new List<LeaveAccrual>();
          //  List<LeaveAccrualSummary> leaveAccrualSummaries = new List<LeaveAccrualSummary>();

            var employeeLeaveEligibilityDetails = await payrollProcessingMethodRepository.GetProcessedEmployeeDetailsForLeaveAccrual(paygroupid);
            foreach (var eligibleEmployee in employeeLeaveEligibilityDetails)
            {
                var now = DateTime.Now;
                int daysInMonth = DateTime.DaysInMonth(now.Year, now.Month);

                LeaveAccrual leaveAccrualEmployee = new LeaveAccrual();
                leaveAccrualEmployee.EmployeeId = eligibleEmployee.EmployeeId;
                leaveAccrualEmployee.EmployeeCode = eligibleEmployee.EmployeeCode;
                leaveAccrualEmployee.EmployeeName = eligibleEmployee.EmployeeName;
                leaveAccrualEmployee.PayrollProcessingId = eligibleEmployee.PayrollProcessingId;
                leaveAccrualEmployee.AccrualStatus = 0; //Pending
                leaveAccrualEmployee.AccrualDate = new DateTime(now.Year, now.Month, daysInMonth); // Insert accrual date as end of month eg : 31/05/2023
                leaveAccrualEmployee.IsArchived = false;
                leaveAccrualEmployee.AvailAmount = 0;
                leaveAccrualEmployee.AvailDays = 0;
                leaveAccrualEmployee.LeaveId = 0;
                leaveAccrualEmployee.EligibilityBase = eligibleEmployee.EligibilityBase;
                leaveAccrualEmployee.CFLimitDays = eligibleEmployee.CFLimitDays;
                leaveAccrualEmployee.IsIncludeLOPDays = eligibleEmployee.IsIncludeLOPDays;
                leaveAccrualEmployee.LeaveCutOffType = eligibleEmployee.LeaveCutOffType;
                leaveAccrualEmployee.MonthlyAmount = eligibleEmployee.MonthlyAmount;

                var systemVariableValues = await systemVariableValuesRepository.GetSystemVariableValuesByEmployeeId(eligibleEmployee.EmployeeId);
                if (systemVariableValues != null && systemVariableValues.Count() > 0)
                {
                    leaveAccrualEmployee.EligibilityPerDay = (decimal)eligibleEmployee.EligibleDays /eligibleEmployee.EligibilityBase;
                    leaveAccrualEmployee.WorkingdaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Wkg_Dys_Cldr_Mth").TransValue;
                    leaveAccrualEmployee.WorkeddaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Wkd_Dys_Cldr_Mth").TransValue;     
                }

                // Get previous accrual summary details for eligible employee
                var prevAccrualSummaryDetails = await leaveAccrualSummaryRepository.GetPreviousAccrualSummary(eligibleEmployee.EmployeeId);
                var firstDayNextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(+1); // First day next month - LeaveSUmmary entered for next month
                                                                                            // leaveAccrualSummary.AccrualDate = firstDayNextMonth;


                bool isLeaveCutOff = false;
                if ((LeaveCutOffType.YearEnd == eligibleEmployee.LeaveCutOffType && firstDayNextMonth.Year != now.Year)
                    || (LeaveCutOffType.HalfYearEnd == eligibleEmployee.LeaveCutOffType && firstDayNextMonth.Month > 6)
                    || (LeaveCutOffType.QuarterEnd == eligibleEmployee.LeaveCutOffType && firstDayNextMonth.Month > 3)
                    || (LeaveCutOffType.MonthEnd == eligibleEmployee.LeaveCutOffType)
                    )
                {
                    isLeaveCutOff = true;
                }

                if (prevAccrualSummaryDetails == null || isLeaveCutOff)
                {
                    //No need to check cutoff or carry forward as there is no previous entry for this employee

                    if (eligibleEmployee.IsIncludeLOPDays)
                    {
                        leaveAccrualEmployee.AccrualDays = leaveAccrualEmployee.EligibilityPerDay * leaveAccrualEmployee.WorkeddaysInCalMonth;
                    }
                    else
                    {
                        leaveAccrualEmployee.AccrualDays = leaveAccrualEmployee.EligibilityPerDay * leaveAccrualEmployee.WorkingdaysInCalMonth;
                    }
                }
                else 
                {
                    if (firstDayNextMonth <= prevAccrualSummaryDetails.AccrualDate && prevAccrualSummaryDetails.IsArchived == false)
                    {
                        throw new ResourceNotFoundException("Leave Accrual already generated for the month " + prevAccrualSummaryDetails.AccrualDate);
                    }
                    if (prevAccrualSummaryDetails.AccrualDays >= eligibleEmployee.CFLimitDays)
                    {
                        //no entry to be made into both tables - LeaveAccrual and LeaveSummary
                        continue;
                    }
                    else
                    {
                        decimal currentAccrual = leaveAccrualEmployee.EligibilityPerDay * leaveAccrualEmployee.WorkeddaysInCalMonth;
                        decimal totalAccrualDays = prevAccrualSummaryDetails.AccrualDays + currentAccrual;

                        if (totalAccrualDays > eligibleEmployee.CFLimitDays)
                        {
                            leaveAccrualEmployee.AccrualDays = eligibleEmployee.CFLimitDays - prevAccrualSummaryDetails.AccrualDays;
                           // leaveAccrualSummary.AccrualDays = eligibleEmployee.CFLimitDays;
                        }
                        else
                        {
                            leaveAccrualEmployee.AccrualDays = currentAccrual;
                            //leaveAccrualSummary.AccrualDays = totalAccrualDays;
                        }
                    }
                }
                leaveAccrualEmployee.AccrualAmount = ((decimal)eligibleEmployee.MonthlyAmount / eligibleEmployee.EligibleDays) * leaveAccrualEmployee.AccrualDays;
                leaveAccruals.Add(leaveAccrualEmployee);
            }
            return leaveAccruals;
        }

        public async Task<int> InsertLeaveAccruals(List<LeaveAccrual> leaveAccruals)
        {
            var result = await leaveAccrualRepository.BulkInsertAsync(leaveAccruals);            
            return result;
        }

        public async Task<List<LeaveAccrual>> GetGeneratedLeaveAccruals(int payrollprocessid)
        {
            // Get paygroupid and get employeeid for that paygroup and generated accruals based on that 
            return (List<LeaveAccrual>)await leaveAccrualRepository.GetLeaveAccrualsByPayrollProcessingId(payrollprocessid);
        }

        public async Task<IEnumerable<AccrualsPrintViewModel>> GetAccrualsByPayrollProcessingId(int payrollProcessingId)
        {
            return await leaveAccrualRepository.GetAccrualsByPayrollProcessingId(payrollProcessingId);
        }

        //public Task<int> DeleteAsync(int id)
        //{
        //    throw new System.NotImplementedException();
        //}

        //public Task<IEnumerable<LeaveAccrual>> GetAllAsync()
        //{
        //    throw new System.NotImplementedException();
        //}

        //public Task<LeaveAccrual> GetAsync(int id)
        //{
        //    throw new System.NotImplementedException();
        //}

        //public Task<int> InsertAsync(LeaveAccrual leave)
        //{
        //    throw new System.NotImplementedException();
        //}

    }
}
