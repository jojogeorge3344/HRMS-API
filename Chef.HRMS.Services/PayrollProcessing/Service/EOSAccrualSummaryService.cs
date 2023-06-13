using Chef.Common.Exceptions;
using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using Chef.HRMS.Repositories;
using Chef.HRMS.Repositories.PayrollProcessing.Repository;
using Chef.HRMS.Services.PayrollProcessing.Interface;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.PayrollProcessing.Service
{
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
                eosAccrualSummary.AvaillDays = 0;
                eosAccrualSummary.AvailAmount = 0;
                var firstDayNextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(+1); // First day next month - EOSSUmmary entered for next month
                eosAccrualSummary.AccrualDate = firstDayNextMonth;

                if (firstDayNextMonth <= prevAccrualSummaryDetails.AccrualDate)
                {
                    throw new ResourceNotFoundException("Accrual summary already generated for the month " + prevAccrualSummaryDetails.AccrualDate);
                }

                //bool isLeaveCutOff = false;
                //if ((LeaveCutOffType.YearEnd == employeeLeaveAccrual.LeaveCutOffType && firstDayNextMonth.Year != now.Year)
                //    || (LeaveCutOffType.HalfYearEnd == employeeLeaveAccrual.LeaveCutOffType && firstDayNextMonth.Month > 6)
                //    || (LeaveCutOffType.QuarterEnd == employeeLeaveAccrual.LeaveCutOffType && firstDayNextMonth.Month > 3)
                //    || (LeaveCutOffType.MonthEnd == employeeLeaveAccrual.LeaveCutOffType)
                //    )
                //{
                //    isLeaveCutOff = true;
                //}

                if (prevAccrualSummaryDetails == null) //|| isLeaveCutOff
                {
                    //No need to check cutoff or carry forward as there is no previous entry for this employee

                    //Insert into Accrual summary table 
                    eosAccrualSummary.AccrualDays = employeeEOSAccrual.AccrualDays;
                    eosAccrualSummary.AccrualAmount = employeeEOSAccrual.AccrualAmount;
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
                        decimal currentAccrual = employeeEOSAccrual.EligibilityPerDay * employeeEOSAccrual.WorkeddaysInCalMonth;
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
                eosAccrualSummary.AccrualAmount = ((decimal)employeeEOSAccrual.MonthlyAmount / employeeEOSAccrual.EligibilityBase) * employeeEOSAccrual.AccrualDays;
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
}
