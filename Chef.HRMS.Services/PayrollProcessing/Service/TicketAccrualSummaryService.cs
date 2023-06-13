﻿using Chef.Common.Exceptions;
using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using Chef.HRMS.Repositories;
using Chef.HRMS.Repositories.PayrollProcessing.Repository;
using Chef.HRMS.Services.PayrollProcessing.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.PayrollProcessing.Service
{
    public class TicketAccrualSummaryService : AsyncService<TicketAccrualSummary>, ITicketAccrualSummaryService
    {
        private readonly ITicketAccrualSummaryRepository ticketAccrualSummaryRepository;

        public TicketAccrualSummaryService(ITicketAccrualSummaryRepository ticketAccrualSummaryRepository)
        {
            this.ticketAccrualSummaryRepository = ticketAccrualSummaryRepository;
        }

        public async Task<int> GenerateAndInsertTicketAccrualSummary(List<TicketAccrual> ticketAccruals)
        {
            List<TicketAccrualSummary> ticketAccrualSummaries = new List<TicketAccrualSummary>();
            foreach (var employeeTicketAccrual in ticketAccruals)
            {
                var now = DateTime.Now;
                int daysInMonth = DateTime.DaysInMonth(now.Year, now.Month);


                // Get previous accrual summary details for eligible employee
                var prevAccrualSummaryDetails = await ticketAccrualSummaryRepository.GetPreviousTicketAccrualSummary(employeeTicketAccrual.EmployeeId);

                TicketAccrualSummary ticketAccrualSummary = new TicketAccrualSummary();
                ticketAccrualSummary.EmployeeId = employeeTicketAccrual.EmployeeId;
                //ticketAccrualSummary.AvaillDays = 0;
                //ticketAccrualSummary.AvailAmount = 0;
                var firstDayNextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(+1); // First day next month - EOSSUmmary entered for next month
                ticketAccrualSummary.AccrualDate = firstDayNextMonth;

                if (firstDayNextMonth <= prevAccrualSummaryDetails.AccrualDate)
                {
                    throw new ResourceNotFoundException("Accrual summary already generated for the month " + prevAccrualSummaryDetails.AccrualDate);
                }

                if (prevAccrualSummaryDetails == null) //|| isLeaveCutOff
                {
                    //No need to check cutoff or carry forward as there is no previous entry for this employee

                    //Insert into Accrual summary table 
                    ticketAccrualSummary.AccrualDays = employeeTicketAccrual.AccrualDays;
                    ticketAccrualSummary.AccrualAmount = employeeTicketAccrual.AccrualAmount;
                }
                else
                {

                    //if (prevAccrualSummaryDetails.AccrualDays >= employeeEOSAccrual.CFLimitDays)
                    //{
                    //    //no entry to be made into LeaveSummary table
                    //    continue;
                    //}
                    //else
                    //{
                    decimal currentAccrual = employeeTicketAccrual.EligibilityPerDay * employeeTicketAccrual.WorkeddaysInCalMonth;
                    decimal totalAccrualDays = prevAccrualSummaryDetails.AccrualDays + currentAccrual;

                    //if (totalAccrualDays > employeeEOSAccrual.CFLimitDays)
                    //{
                    //    //leaveAccrualEmployee.AccrualDays = eligibleEmployee.CFLimitDays - prevAccrualSummaryDetails.AccrualDays;
                    //    leaveAccrualSummary.AccrualDays = employeeLeaveAccrual.CFLimitDays;
                    //}
                    //else
                    //{
                    //    // leaveAccrualEmployee.AccrualDays = currentAccrual;
                    //    leaveAccrualSummary.AccrualDays = totalAccrualDays;
                    //}
                    //}
                }
                ticketAccrualSummary.AccrualAmount = ((decimal)employeeTicketAccrual.MonthlyAmount / employeeTicketAccrual.EligibilityBase) * employeeTicketAccrual.AccrualDays;
                ticketAccrualSummaries.Add(ticketAccrualSummary);
            }

            var result = await ticketAccrualSummaryRepository.BulkInsertAsync(ticketAccrualSummaries);
            return result;
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
