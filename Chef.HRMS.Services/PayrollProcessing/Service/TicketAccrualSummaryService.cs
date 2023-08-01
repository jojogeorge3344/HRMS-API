using Chef.Common.Exceptions;
using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using Chef.HRMS.Repositories;
using Chef.HRMS.Services.PayrollProcessing.Interface;
using System;

namespace Chef.HRMS.Services.PayrollProcessing.Service;

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
            var firstDayNextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(+1); // First day next month - EOSSUmmary entered for next month
            ticketAccrualSummary.AccrualDate = firstDayNextMonth;

            //if previous data is available for this employee
            if (prevAccrualSummaryDetails != null)
            {
                if (firstDayNextMonth <= prevAccrualSummaryDetails.AccrualDate)
                {
                    throw new ResourceNotFoundException("Ticket accrual summary already generated for the month " + prevAccrualSummaryDetails.AccrualDate);
                }
                decimal currentAccrual = employeeTicketAccrual.EligibilityPerDay * employeeTicketAccrual.WorkeddaysInCalMonth;
                decimal totalAccrualDays = prevAccrualSummaryDetails.AccrualDays + currentAccrual;
                ticketAccrualSummary.AccrualDays = totalAccrualDays;
                ticketAccrualSummary.AccrualAmount = (employeeTicketAccrual.MonthlyAmount / employeeTicketAccrual.EligibilityBase) * employeeTicketAccrual.AccrualDays;
            }
            //if first time processing payroll for this employee
            else
            {
                ticketAccrualSummary.AccrualDays = employeeTicketAccrual.AccrualDays;
                ticketAccrualSummary.AccrualAmount = employeeTicketAccrual.AccrualAmount;
            }
            ticketAccrualSummaries.Add(ticketAccrualSummary);
        }

        var result = await ticketAccrualSummaryRepository.BulkInsertAsync(ticketAccrualSummaries);
        return result;
    }
}
