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
                var prevAccrualSummaryDetails = await leaveAccrualSummaryRepository.GetPreviousAccrualSummary(leaveAvailedDetails.EmployeeId, 1, now.Month, now.Year);

                if (prevAccrualSummaryDetails != null)
                {
                    leaveAccrualSummary.EmployeeId = leaveAvailedDetails.EmployeeId;
                    leaveAccrualSummary.AvailDays = leaveAvailedDetails.AvailDays;
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
            List<LeaveAccrualSummary> leaveAccrualSummaries = new List<LeaveAccrualSummary>();

            var employeeLeaveEligibilityDetails = await payrollProcessingMethodRepository.GetProcessedEmployeeDetailsByPayGroupId(paygroupid);
            foreach (var eligibleEmployee in employeeLeaveEligibilityDetails)
            {
                var now = DateTime.Now;
                int daysInMonth = DateTime.DaysInMonth(now.Year, now.Month);

                LeaveAccrual leaveAccrualEmployee = new LeaveAccrual();
                leaveAccrualEmployee.EmployeeId = eligibleEmployee.EmployeeId;
                leaveAccrualEmployee.AccrualStatus = 0; //Pending
                leaveAccrualEmployee.AccrualDate = new DateTime(now.Year, now.Month, daysInMonth); // Insert accrual date as end of month eg : 31/05/2023
                leaveAccrualEmployee.IsArchived = false;
                leaveAccrualEmployee.AvailAmount = 0;
                leaveAccrualEmployee.AvailDays = 0;
                leaveAccrualEmployee.LeaveId = 0;

                var systemVariableValues = await systemVariableValuesRepository.GetSystemVariableValuesByEmployeeId(eligibleEmployee.EmployeeId);
                if (systemVariableValues != null)
                {
                    decimal workingdaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Wkg_Dys_Cldr_Mth").TransValue;
                    decimal workeddaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Wkd_Dys_Cldr_Mth").TransValue;
                    decimal eligibilityPerDay = (decimal)eligibleEmployee.EligibleDays / eligibleEmployee.EligibilityBase;
                    if (eligibleEmployee.IsIncludeLOPDays)
                    {
                        leaveAccrualEmployee.AccrualDays = eligibilityPerDay * (workeddaysInCalMonth);
                    }
                    else
                    {
                        leaveAccrualEmployee.AccrualDays = (eligibleEmployee.EligibleDays / eligibleEmployee.EligibilityBase) * (workingdaysInCalMonth);
                    }
                    leaveAccrualEmployee.AccrualAmount = (1 / eligibleEmployee.EligibleDays) * leaveAccrualEmployee.AccrualDays;
                    //eligibleEmployee.
                    //Annual Accrual BF Code from Leave Component Amont from Salary structure 
                }

                leaveAccruals.Add(leaveAccrualEmployee);

                // Get previous accrual summary details for this employee

                var prevAccrualSummaryDetails = await leaveAccrualSummaryRepository.GetPreviousAccrualSummary(eligibleEmployee.EmployeeId, 1, now.Month, now.Year);

                LeaveAccrualSummary leaveAccrualSummary = new LeaveAccrualSummary();
                leaveAccrualSummary.EmployeeId = eligibleEmployee.EmployeeId;
                leaveAccrualSummary.AvailDays = 0;
                leaveAccrualSummary.AvailAmount = 0;
                leaveAccrualSummary.LeaveId = 0; // Check with Sherin
                var firstDayNextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(+1);
                leaveAccrualSummary.AccrualDate = firstDayNextMonth;


                bool isLeaveCutOff = false;
                if ((LeaveCutOffType.YearEnd == eligibleEmployee.LeaveCutOffType && firstDayNextMonth.Year != now.Year)
                    || (LeaveCutOffType.HalfYearEnd == eligibleEmployee.LeaveCutOffType && firstDayNextMonth.Month > 6)
                    || (LeaveCutOffType.QuarterEnd == eligibleEmployee.LeaveCutOffType && firstDayNextMonth.Month > 3)
                    || (LeaveCutOffType.MonthEnd == eligibleEmployee.LeaveCutOffType)
                    )
                {
                    isLeaveCutOff = true;
                }

                if (prevAccrualSummaryDetails == null)
                {
                    //Insert into Accrual summary table 
                    leaveAccrualSummary.AccrualDays = leaveAccrualEmployee.AccrualDays;
                    leaveAccrualSummary.AccrualAmount = leaveAccrualEmployee.AccrualAmount;
                }
                else if (isLeaveCutOff)
                {
                    if (prevAccrualSummaryDetails.AccrualDays >= eligibleEmployee.CFLimitDays && eligibleEmployee.CFLimitDays > 0)
                    {
                        leaveAccrualSummary.AccrualDays = eligibleEmployee.CFLimitDays;
                        leaveAccrualSummary.AccrualAmount = 0;
                    }
                    else if (prevAccrualSummaryDetails.AccrualDays < eligibleEmployee.CFLimitDays && eligibleEmployee.CFLimitDays > 0)
                    {
                        leaveAccrualSummary.AccrualDays = leaveAccrualEmployee.AccrualDays;
                        leaveAccrualSummary.AccrualAmount = leaveAccrualEmployee.AccrualAmount;
                    }
                    else
                    {
                        leaveAccrualSummary.AccrualDays = 0;
                        leaveAccrualSummary.AccrualAmount = 0;
                    }
                }
                else
                {
                    //Add with prev accrual summary data and insert - LeaveCutOff Not Applicable and Sum of Accrual days > CFLimit
                    
                    leaveAccrualSummary.AccrualDays = prevAccrualSummaryDetails.AccrualDays + leaveAccrualEmployee.AccrualDays;
                    leaveAccrualSummary.AccrualAmount = prevAccrualSummaryDetails.AccrualAmount + leaveAccrualEmployee.AccrualAmount;
                    if (leaveAccrualSummary.AccrualDays > eligibleEmployee.CFLimitDays)
                    {
                        leaveAccrualSummary.AccrualDays = eligibleEmployee.CFLimitDays;

                    }

                }
                leaveAccrualSummaries.Add(leaveAccrualSummary);
            }

            var result = await leaveAccrualSummaryRepository.BulkInsertAsync(leaveAccrualSummaries);
            result = await leaveAccrualRepository.BulkInsertAsync(leaveAccruals);
            return leaveAccruals;
        }

        public Task<int> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<IEnumerable<LeaveAndAttendance>> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<LeaveAndAttendance> GetAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<int> InsertAsync(LeaveAndAttendance obj)
        {
            throw new System.NotImplementedException();
        }

    }
}
