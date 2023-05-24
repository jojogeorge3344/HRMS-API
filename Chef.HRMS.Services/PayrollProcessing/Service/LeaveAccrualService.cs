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

        public async Task<IEnumerable<LeaveAccrual>> GenerateLeaveAccruals(int paygroupid, bool isavail)
        {
            List<LeaveAccrual> leaveAccruals = new List<LeaveAccrual>();
            List<LeaveAccrualSummary> leaveAccrualSummaries = new List<LeaveAccrualSummary>();
            if (isavail)
            {
                //Reduce the availed days from the accrued days from the summary table

                //Make an entry in the leave accrual table with value in availdays and availamount 

            }
            else
            {
                //Check for leavetype also - 1 - Accrued

                var employeeLeaveEligibilityDetails = await payrollProcessingMethodRepository.GetProcessedEmployeeDetailsByPayGroupId(paygroupid);
                foreach (var eligibleEmployee in employeeLeaveEligibilityDetails)
                {
                    LeaveAccrual leaveAccrualEmployee = new LeaveAccrual();
                    leaveAccrualEmployee.EmployeeId = eligibleEmployee.EmployeeId;
                    leaveAccrualEmployee.AccrualStatus = 0; //Pending

                    var now = DateTime.Now;
                    int daysInMonth = DateTime.DaysInMonth(now.Year, now.Month);
                    leaveAccrualEmployee.AccrualDate = new DateTime(now.Year, now.Month, daysInMonth);
                    leaveAccrualEmployee.IsArchived = false;
                    leaveAccrualEmployee.AvailAmount = 0;
                    leaveAccrualEmployee.AvailDays = 0;
                    leaveAccrualEmployee.LeaveId = 0; //// Check with Sherin
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

                   // DateTime prevMonth = now.AddMonths(-1);
                    var prevAccrualSummaryDetails = await leaveAccrualSummaryRepository.GetPreviousAccrualSummary(eligibleEmployee.EmployeeId, 1, now.Month, now.Year);
                    LeaveAccrualSummary leaveAccrualSummary = new LeaveAccrualSummary();
                    leaveAccrualSummary.EmployeeId = eligibleEmployee.EmployeeId;
                    leaveAccrualSummary.AvailDays = 0;
                    leaveAccrualSummary.AvailAmount = 0;
                    leaveAccrualSummary.LeaveId = 0; // Check with Sherin
                    var firstDayNextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(+1);
                    leaveAccrualSummary.AccrualDate = firstDayNextMonth;

                    if (prevAccrualSummaryDetails == null)
                    {
                        //Insert into Accrual summary table 
                        leaveAccrualSummary.AccrualDays = leaveAccrualEmployee.AccrualDays;
                        leaveAccrualSummary.AccrualAmount = leaveAccrualEmployee.AccrualAmount;
                    }
                    else
                    {
                        //Add with prev accrual summary data and insert 
                        leaveAccrualSummary.AccrualDays = prevAccrualSummaryDetails.AccrualDays + leaveAccrualEmployee.AccrualDays;
                        leaveAccrualSummary.AccrualAmount = prevAccrualSummaryDetails.AccrualAmount + leaveAccrualEmployee.AccrualAmount;                        
                    }
                    leaveAccrualSummaries.Add(leaveAccrualSummary);
                }

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
