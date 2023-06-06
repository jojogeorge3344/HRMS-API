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
using Chef.HRMS.Models.PayrollProcessing;

namespace Chef.HRMS.Services.PayrollProcessing.Service
{
    public class TicketAccrualService  : AsyncService<TicketAccrual>, ITicketAccrualService
    {
        private readonly ITicketAccrualRepository ticketAccrualRepository;
        private readonly ITicketAccrualSummaryRepository ticketAccrualSummaryRepository;
        private readonly IPayrollProcessingMethodRepository payrollProcessingMethodRepository;
        private readonly ISystemVariableValuesRepository systemVariableValuesRepository;

        public TicketAccrualService(ITicketAccrualRepository ticketAccrualRepository, IPayrollProcessingMethodRepository payrollProcessingMethodRepository,
            ITicketAccrualSummaryRepository ticketAccrualSummaryRepository, ISystemVariableValuesRepository systemVariableValuesRepository)
        {
            this.ticketAccrualRepository = ticketAccrualRepository;
            this.payrollProcessingMethodRepository = payrollProcessingMethodRepository;
            this.ticketAccrualSummaryRepository = ticketAccrualSummaryRepository;
            this.systemVariableValuesRepository = systemVariableValuesRepository;
        }

        public async Task<int> SaveTicketAccruals(List<TicketAccrual> ticketAccruals)
        {
            return 0;
        }

        public async Task<int> GenerateTicketAvailed(TicketAccrual leaveAvailedDetails)
        {
            //Make an entry in the leave accrual table with value in availdays and availamount 
            //Make an entry in the leave accrual summary table - reducing the availdays from the accrueddays for specific employee
            //AvailAmount to be sent in the leaveAvailedDetails 

            //TicketAccrual ticketLeaveAccrual = new TicketAccrual();
            //TicketAccrualSummary ticketAccrualSummary = new TicketAccrualSummary();

            //if (leaveAvailedDetails != null)
            //{
            //    ticketLeaveAccrual.EmployeeId = leaveAvailedDetails.EmployeeId;
            //    ticketLeaveAccrual.AccrualStatus = 0; //Pending
            //    ticketLeaveAccrual.IsArchived = false;
            //  //  ticketLeaveAccrual.AvailAmount = 0;
            //  //  employeeLeaveAccrual.AvailDays = leaveAvailedDetails.AvailDays;
            // //   employeeLeaveAccrual.LeaveId = leaveAvailedDetails.LeaveId;

            //    // Get previous accrual summary details for this employee
            //    DateTime now = DateTime.Now;
            //    var prevAccrualSummaryDetails = await ticketAccrualSummaryRepository.GetPreviousAccrualSummary(leaveAvailedDetails.EmployeeId, 1, now.Month, now.Year);

            //    if (prevAccrualSummaryDetails != null)
            //    {
            //        ticketLeaveAccrual.EmployeeId = leaveAvailedDetails.EmployeeId;
            //        //leaveAccrualSummary.AvailDays = leaveAvailedDetails.AvailDays;
            //        //leaveAccrualSummary.AvailAmount = leaveAvailedDetails.AvailAmount;
            //        //leaveAccrualSummary.LeaveId = leaveAvailedDetails.LeaveId;
            //        ticketLeaveAccrual.AccrualDate = leaveAvailedDetails.AccrualDate;
            //        //leaveAccrualSummary.AccrualDays = prevAccrualSummaryDetails.AccrualDays - leaveAvailedDetails.AvailDays;
            //        //leaveAccrualSummary.AccrualAmount = prevAccrualSummaryDetails.AccrualAmount - leaveAvailedDetails.AvailAmount;
            //    }
            //    var result = await ticketAccrualRepository.InsertAsync(ticketLeaveAccrual);
            //    return await ticketAccrualSummaryRepository.InsertAsync(ticketAccrualSummary);
            //}
            //else
            //{
            //    throw new ResourceNotFoundException("Leave availed details is null.");
            //}

            return 0;

        }

        public async Task<IEnumerable<TicketAccrual>> GenerateTicketAccruals(int paygroupid)
        {
            List<TicketAccrual> ticketAccruals = new List<TicketAccrual>();
            List<TicketAccrualSummary> ticketAccrualSummaries = new List<TicketAccrualSummary>();
            return ticketAccruals;
            //var employeeLeaveEligibilityDetails = await payrollProcessingMethodRepository.GetProcessedEmployeeDetailsByPayGroupId(paygroupid);
            //foreach (var eligibleEmployee in employeeLeaveEligibilityDetails)
            //{
            //    var now = DateTime.Now;
            //    int daysInMonth = DateTime.DaysInMonth(now.Year, now.Month);

            //    LeaveAccrual leaveAccrualEmployee = new LeaveAccrual();
            //    leaveAccrualEmployee.EmployeeId = eligibleEmployee.EmployeeId;
            //    leaveAccrualEmployee.AccrualStatus = 0; //Pending
            //    leaveAccrualEmployee.AccrualDate = new DateTime(now.Year, now.Month, daysInMonth); // Insert accrual date as end of month eg : 31/05/2023
            //    leaveAccrualEmployee.IsArchived = false;
            //    leaveAccrualEmployee.AvailAmount = 0;
            //    leaveAccrualEmployee.AvailDays = 0;
            //    leaveAccrualEmployee.LeaveId = 0;

            //    var systemVariableValues = await systemVariableValuesRepository.GetSystemVariableValuesByEmployeeId(eligibleEmployee.EmployeeId);
            //    decimal workingdaysInCalMonth = 0;
            //    decimal workeddaysInCalMonth = 0;
            //    decimal eligibilityPerDay = 0;
            //    if (systemVariableValues != null)
            //    {
            //        eligibilityPerDay = (decimal)eligibleEmployee.EligibleDays /eligibleEmployee.EligibilityBase;
            //        workingdaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Wkg_Dys_Cldr_Mth").TransValue;
            //        workeddaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Wkd_Dys_Cldr_Mth").TransValue;     
            //    }

            //    // Get previous accrual summary details for eligible employee
            //    var prevAccrualSummaryDetails = await ticketAccrualSummaryRepository.GetPreviousAccrualSummary(eligibleEmployee.EmployeeId, 1, now.Month, now.Year);

            //    LeaveAccrualSummary leaveAccrualSummary = new LeaveAccrualSummary();
            //    leaveAccrualSummary.EmployeeId = eligibleEmployee.EmployeeId;
            //    leaveAccrualSummary.AvailDays = 0;
            //    leaveAccrualSummary.AvailAmount = 0;
            //    leaveAccrualSummary.LeaveId = 0;
            //    var firstDayNextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(+1); // First day next month - LeaveSUmmary entered for next month
            //    leaveAccrualSummary.AccrualDate = firstDayNextMonth;

            //    if (firstDayNextMonth <= prevAccrualSummaryDetails.AccrualDate)
            //    {
            //        throw new ResourceNotFoundException("Accrual already generated for the month " + prevAccrualSummaryDetails.AccrualDate);
            //    }
            //    bool isLeaveCutOff = false;
            //    if ((LeaveCutOffType.YearEnd == eligibleEmployee.LeaveCutOffType && firstDayNextMonth.Year != now.Year)
            //        || (LeaveCutOffType.HalfYearEnd == eligibleEmployee.LeaveCutOffType && firstDayNextMonth.Month > 6)
            //        || (LeaveCutOffType.QuarterEnd == eligibleEmployee.LeaveCutOffType && firstDayNextMonth.Month > 3)
            //        || (LeaveCutOffType.MonthEnd == eligibleEmployee.LeaveCutOffType)
            //        )
            //    {
            //        isLeaveCutOff = true;
            //    }

            //    if (prevAccrualSummaryDetails == null || isLeaveCutOff)
            //    {
            //        //No need to check cutoff or carry forward as there is no previous entry for this employee

            //        if (eligibleEmployee.IsIncludeLOPDays)
            //        {
            //            leaveAccrualEmployee.AccrualDays = eligibilityPerDay * workeddaysInCalMonth;
            //        }
            //        else
            //        {
            //            leaveAccrualEmployee.AccrualDays = eligibilityPerDay * workingdaysInCalMonth;
            //        }
                    
            //        //Insert into Accrual summary table 
            //        leaveAccrualSummary.AccrualDays = leaveAccrualEmployee.AccrualDays;
            //        leaveAccrualSummary.AccrualAmount = leaveAccrualEmployee.AccrualAmount;
            //    }
            //    else 
            //    {

            //        if (prevAccrualSummaryDetails.AccrualDays >= eligibleEmployee.CFLimitDays)
            //        {
            //            //no entry to be made into both tables - LeaveAccrual and LeaveSummary
            //            continue;
            //        }
            //        else
            //        {
            //            decimal currentAccrual = eligibilityPerDay * workeddaysInCalMonth;
            //            decimal totalAccrualDays = prevAccrualSummaryDetails.AccrualDays + currentAccrual;

            //            if (totalAccrualDays > eligibleEmployee.CFLimitDays)
            //            {
            //                leaveAccrualEmployee.AccrualDays = eligibleEmployee.CFLimitDays - prevAccrualSummaryDetails.AccrualDays;
            //                leaveAccrualSummary.AccrualDays = eligibleEmployee.CFLimitDays;
            //            }
            //            else
            //            {
            //                leaveAccrualEmployee.AccrualDays = currentAccrual;
            //                leaveAccrualSummary.AccrualDays = totalAccrualDays;
            //            }
            //        }
            //    }
            //    leaveAccrualEmployee.AccrualAmount = ((decimal)eligibleEmployee.MonthlyAmount / eligibleEmployee.EligibleDays) * leaveAccrualEmployee.AccrualDays;
            //    leaveAccrualSummary.AccrualAmount = ((decimal)eligibleEmployee.MonthlyAmount / eligibleEmployee.EligibilityBase) * leaveAccrualSummary.AccrualDays;
            //    leaveAccruals.Add(leaveAccrualEmployee);
            //    leaveAccrualSummaries.Add(leaveAccrualSummary);
            //}

            //var result = await leaveAccrualSummaryRepository.BulkInsertAsync(leaveAccrualSummaries);
            //result = await leaveAccrualRepository.BulkInsertAsync(leaveAccruals);
            //return leaveAccruals;
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
