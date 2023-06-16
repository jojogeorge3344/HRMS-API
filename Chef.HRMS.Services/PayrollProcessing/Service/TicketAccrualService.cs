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
using Chef.HRMS.Repositories.PayrollProcessing.Repository;

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

        public async Task<int> GenerateTicketAvailed(TicketAccrual ticketAvailedDetails)
        {
            //Make an entry in the leave accrual table with value in availdays and availamount 
            //Make an entry in the leave accrual summary table - reducing the availdays from the accrueddays for specific employee
            //AvailAmount to be sent in the leaveAvailedDetails 

            TicketAccrual ticketLeaveAccrual = new TicketAccrual();
            TicketAccrualSummary ticketAccrualSummary = new TicketAccrualSummary();

            if (ticketAvailedDetails != null)
            {
                ticketLeaveAccrual.EmployeeId = ticketAvailedDetails.EmployeeId;
                ticketLeaveAccrual.AccrualStatus = 0; //Pending
                ticketLeaveAccrual.IsArchived = false;
                ticketLeaveAccrual.AvailAmount = ticketAvailedDetails.AvailAmount;

                // Get previous accrual summary details for this employee
                DateTime now = DateTime.Now;
                var prevAccrualSummaryDetails = await ticketAccrualSummaryRepository.GetPreviousTicketAccrualSummary(ticketAvailedDetails.EmployeeId);

                if (prevAccrualSummaryDetails != null)
                {
                    ticketAccrualSummary.EmployeeId = ticketAvailedDetails.EmployeeId;
                    ticketAccrualSummary.AvailDays = ticketAvailedDetails.AvailDays;
                    ticketAccrualSummary.AvailAmount = ticketAvailedDetails.AvailAmount;
                    ticketAccrualSummary.AccrualDate = ticketAvailedDetails.AccrualDate;
                    ticketAccrualSummary.AccrualDays = prevAccrualSummaryDetails.AccrualDays - ticketAvailedDetails.AvailDays;
                    ticketAccrualSummary.AccrualAmount = prevAccrualSummaryDetails.AccrualAmount - ticketAvailedDetails.AvailAmount;
                }
                var result = await ticketAccrualRepository.InsertAsync(ticketLeaveAccrual);
                return await ticketAccrualSummaryRepository.InsertAsync(ticketAccrualSummary);
            }
            else
            {
                throw new ResourceNotFoundException("Leave availed details is null.");
            }

            throw new System.NotImplementedException();

        }

        public async Task<IEnumerable<TicketAccrual>> GenerateTicketAccruals(int paygroupid)
        {
            List<TicketAccrual> ticketAccruals = new List<TicketAccrual>();
            List<TicketAccrualSummary> ticketAccrualSummaries = new List<TicketAccrualSummary>();

            var employeeTicketEligibilityDetails = await payrollProcessingMethodRepository.GetProcessedEmployeeDetailsForTicketAccrual(paygroupid);
            foreach (var eligibleEmployee in employeeTicketEligibilityDetails)
            {
                var now = DateTime.Now;
                int daysInMonth = DateTime.DaysInMonth(now.Year, now.Month);

                TicketAccrual ticketAccrualEmployee = new TicketAccrual();
                ticketAccrualEmployee.EmployeeId = eligibleEmployee.EmployeeId;
                ticketAccrualEmployee.AccrualStatus = 0; //Pending
                ticketAccrualEmployee.AccrualDate = new DateTime(now.Year, now.Month, daysInMonth); // Insert accrual date as end of month eg : 31/05/2023
                ticketAccrualEmployee.IsArchived = false;
                ticketAccrualEmployee.AvailAmount = 0;
                ticketAccrualEmployee.AvailDays = 0;
                ticketAccrualEmployee.EligibilityBase = eligibleEmployee.EligibilityBase;
                ticketAccrualEmployee.EligibleDays = eligibleEmployee.EligibleDays;

                var systemVariableValues = await systemVariableValuesRepository.GetSystemVariableValuesByEmployeeId(eligibleEmployee.EmployeeId);


                if (systemVariableValues != null)
                {
                    ticketAccrualEmployee.WorkingdaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Wkg_Dys_Cldr_Mth").TransValue;
                    ticketAccrualEmployee.WorkeddaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Wkd_Dys_Cldr_Mth").TransValue;
                    ticketAccrualEmployee.EligibilityPerDay = (decimal)ticketAccrualEmployee.EligibleDays / ticketAccrualEmployee.EligibilityBase;
                }

                // Get previous accrual summary details for eligible employee
                var prevAccrualSummaryDetails = await ticketAccrualSummaryRepository.GetPreviousTicketAccrualSummary(eligibleEmployee.EmployeeId);

                var firstDayNextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(+1); // First day next month - LeaveSUmmary entered for next month
                ticketAccrualEmployee.AccrualDate = firstDayNextMonth;


                if (prevAccrualSummaryDetails == null)
                {
                    if (firstDayNextMonth <= prevAccrualSummaryDetails.AccrualDate)
                    {
                        throw new ResourceNotFoundException("Ticket Accrual already generated for the month " + prevAccrualSummaryDetails.AccrualDate);
                    }
                }
                if (eligibleEmployee.IncludeLOPDays)
                {
                    ticketAccrualEmployee.AccrualDays = ticketAccrualEmployee.EligibilityPerDay * ticketAccrualEmployee.WorkeddaysInCalMonth;
                }
                else
                {
                    ticketAccrualEmployee.AccrualDays = ticketAccrualEmployee.EligibilityPerDay * ticketAccrualEmployee.WorkingdaysInCalMonth;
                }
                ticketAccrualEmployee.AccrualAmount = ((decimal)eligibleEmployee.MonthlyAmount / eligibleEmployee.EligibleDays) * ticketAccrualEmployee.AccrualDays;
                ticketAccruals.Add(ticketAccrualEmployee);
            }

            var result = await ticketAccrualRepository.BulkInsertAsync(ticketAccruals);
            return ticketAccruals;
        }

        public async Task<int> InsertTicketAccruals(List<TicketAccrual> ticketAccruals)
        {
            var result = await ticketAccrualRepository.BulkInsertAsync(ticketAccruals);
            return result;
        }

        public async Task<List<TicketAccrual>> GetGeneratedTicketAccruals(int payrollprocessid)
        {
            // Get paygroupid and get employeeid for that paygroup and generated accruals based on that 
            return (List<TicketAccrual>)await ticketAccrualRepository.GetTicketAccrualsByPayrollProcessingId(payrollprocessid);
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
