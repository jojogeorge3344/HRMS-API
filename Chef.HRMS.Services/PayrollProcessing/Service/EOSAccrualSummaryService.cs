using Chef.Common.Exceptions;
using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using Chef.HRMS.Repositories;
using Chef.HRMS.Services.PayrollProcessing.Interface;
using System;

namespace Chef.HRMS.Services.PayrollProcessing.Service;

public class EOSAccrualSummaryService : AsyncService<EOSAccrualSummary>, IEOSAccrualSummaryService
{
    private readonly IEOSAccrualSummaryRepository eosAccrualSummaryRepository;

    public EOSAccrualSummaryService(IEOSAccrualSummaryRepository eosAccrualSummaryRepository)
    {
        this.eosAccrualSummaryRepository = eosAccrualSummaryRepository;
    }

    public async Task<int> GenerateAndInsertEOSAccrualSummary(List<EOSAccrual> eosAccruals)
    {
        List<EOSAccrualSummary> eosAccrualSummaries = new List<EOSAccrualSummary>();
        foreach (var employeeEOSAccrual in eosAccruals)
        {
            var now = DateTime.Now;
            int daysInMonth = DateTime.DaysInMonth(now.Year, now.Month);


            // Get previous accrual summary details for eligible employee
            var prevAccrualSummaryDetails = await eosAccrualSummaryRepository.GetPreviousEOSAccrualSummary(employeeEOSAccrual.EmployeeId);

            EOSAccrualSummary eosAccrualSummary = new EOSAccrualSummary();
            eosAccrualSummary.EmployeeId = employeeEOSAccrual.EmployeeId;
            eosAccrualSummary.AvailDays = 0;
            eosAccrualSummary.AvailAmount = 0;
            var firstDayNextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(+1); // First day next month - EOSSUmmary entered for next month
            eosAccrualSummary.AccrualDate = firstDayNextMonth;

            if (prevAccrualSummaryDetails == null)
            {
                if (firstDayNextMonth <= prevAccrualSummaryDetails.AccrualDate)
                {
                    throw new ResourceNotFoundException("Accrual summary already generated for the month " + prevAccrualSummaryDetails.AccrualDate);
                }
                //Insert into Accrual summary table 
                eosAccrualSummary.AccrualDays = employeeEOSAccrual.AccrualDays;
                eosAccrualSummary.AccrualAmount = employeeEOSAccrual.AccrualAmount;
            }
            else
            {
                //decimal currentAccrual = employeeEOSAccrual.EligibilityPerDay * employeeEOSAccrual.WorkeddaysInCalMonth;
                //decimal totalAccrualDays = prevAccrualSummaryDetails.AccrualDays + employeeEOSAccrual.AccrualDays;
                eosAccrualSummary.AccrualDays = employeeEOSAccrual.AccrualDays + prevAccrualSummaryDetails.AccrualDays;
                eosAccrualSummary.AccrualAmount = employeeEOSAccrual.AccrualAmount;
            }
            if (employeeEOSAccrual.IsRetrospectiveAccrual)
            {
                eosAccrualSummary.AccrualAmount = ((employeeEOSAccrual.MonthlyAmount / employeeEOSAccrual.EligibleDays)
                            * (employeeEOSAccrual.AccrualDays + prevAccrualSummaryDetails.AccrualDays)) - prevAccrualSummaryDetails.AccrualAmount;
            }
            else
            {
                eosAccrualSummary.AccrualAmount = (employeeEOSAccrual.MonthlyAmount / employeeEOSAccrual.EligibilityBase) * eosAccrualSummary.AccrualDays;
            }
            eosAccrualSummaries.Add(eosAccrualSummary);
        }

        var result = await eosAccrualSummaryRepository.BulkInsertAsync(eosAccrualSummaries);
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
