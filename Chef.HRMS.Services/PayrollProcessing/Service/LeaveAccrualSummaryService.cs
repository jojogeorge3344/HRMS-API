using Chef.Common.Exceptions;
using Chef.HRMS.Models;
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
    public class LeaveAccrualSummaryService : AsyncService<LeaveAccrualSummary>, ILeaveAccrualSummaryService
    {
        private readonly ILeaveAccrualSummaryRepository leaveAccrualSummaryRepository;
        private readonly IPayrollProcessingMethodRepository payrollProcessingMethodRepository;
        private readonly ISystemVariableValuesRepository systemVariableValuesRepository;
        public LeaveAccrualSummaryService(IPayrollProcessingMethodRepository payrollProcessingMethodRepository,
            ILeaveAccrualSummaryRepository leaveAccrualSummaryRepository, ISystemVariableValuesRepository systemVariableValuesRepository)
        {
            this.payrollProcessingMethodRepository = payrollProcessingMethodRepository;
            this.leaveAccrualSummaryRepository = leaveAccrualSummaryRepository;
            this.systemVariableValuesRepository = systemVariableValuesRepository;
        }
        public async Task<int> GenerateAndInsertLeaveAccrualSummary(List<LeaveAccrual> leaveAccruals)
        {
            List<LeaveAccrualSummary> leaveAccrualSummaries = new List<LeaveAccrualSummary>();
            foreach (var employeeLeaveAccrual in leaveAccruals)
            {
                var now = DateTime.Now;
                int daysInMonth = DateTime.DaysInMonth(now.Year, now.Month);


                // Get previous accrual summary details for eligible employee
                var prevAccrualSummaryDetails = await leaveAccrualSummaryRepository.GetPreviousAccrualSummary(employeeLeaveAccrual.EmployeeId, 1, now.Month, now.Year);

                LeaveAccrualSummary leaveAccrualSummary = new LeaveAccrualSummary();
                leaveAccrualSummary.EmployeeId = employeeLeaveAccrual.EmployeeId;
                leaveAccrualSummary.AvailDays = 0;
                leaveAccrualSummary.AvailAmount = 0;
                leaveAccrualSummary.LeaveId = 0;
                var firstDayNextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(+1); // First day next month - LeaveSUmmary entered for next month
                leaveAccrualSummary.AccrualDate = firstDayNextMonth;

                if (firstDayNextMonth <= prevAccrualSummaryDetails.AccrualDate)
                {
                    throw new ResourceNotFoundException("Accrual summary already generated for the month " + prevAccrualSummaryDetails.AccrualDate);
                }
                bool isLeaveCutOff = false;
                if ((LeaveCutOffType.YearEnd == employeeLeaveAccrual.LeaveCutOffType && firstDayNextMonth.Year != now.Year)
                    || (LeaveCutOffType.HalfYearEnd == employeeLeaveAccrual.LeaveCutOffType && firstDayNextMonth.Month > 6)
                    || (LeaveCutOffType.QuarterEnd == employeeLeaveAccrual.LeaveCutOffType && firstDayNextMonth.Month > 3)
                    || (LeaveCutOffType.MonthEnd == employeeLeaveAccrual.LeaveCutOffType)
                    )
                {
                    isLeaveCutOff = true;
                }

                if (prevAccrualSummaryDetails == null || isLeaveCutOff)
                {
                    //No need to check cutoff or carry forward as there is no previous entry for this employee

                    //Insert into Accrual summary table 
                    leaveAccrualSummary.AccrualDays = employeeLeaveAccrual.AccrualDays;
                    leaveAccrualSummary.AccrualAmount = employeeLeaveAccrual.AccrualAmount;
                }
                else
                {

                    if (prevAccrualSummaryDetails.AccrualDays >= employeeLeaveAccrual.CFLimitDays)
                    {
                        //no entry to be made into LeaveSummary table
                        continue;
                    }
                    else
                    {
                        decimal currentAccrual = employeeLeaveAccrual.EligibilityPerDay * employeeLeaveAccrual.WorkeddaysInCalMonth;
                        decimal totalAccrualDays = prevAccrualSummaryDetails.AccrualDays + currentAccrual;

                        if (totalAccrualDays > employeeLeaveAccrual.CFLimitDays)
                        {
                            //leaveAccrualEmployee.AccrualDays = eligibleEmployee.CFLimitDays - prevAccrualSummaryDetails.AccrualDays;
                            leaveAccrualSummary.AccrualDays = employeeLeaveAccrual.CFLimitDays;
                        }
                        else
                        {
                           // leaveAccrualEmployee.AccrualDays = currentAccrual;
                            leaveAccrualSummary.AccrualDays = totalAccrualDays;
                        }
                    }
                }
                leaveAccrualSummary.AccrualAmount = ((decimal)employeeLeaveAccrual.MonthlyAmount / employeeLeaveAccrual.EligibilityBase) * leaveAccrualSummary.AccrualDays;
                leaveAccrualSummaries.Add(leaveAccrualSummary);
            }

            var result = await leaveAccrualSummaryRepository.BulkInsertAsync(leaveAccrualSummaries);
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
