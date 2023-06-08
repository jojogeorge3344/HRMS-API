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
    public class EOSAccrualService  : AsyncService<EOSAccrual>, IEOSAccrualService
    {
        private readonly IEOSAccrualRepository eosAccrualRepository;
        private readonly IEOSAccrualSummaryRepository eosAccrualSummaryRepository;
        private readonly IPayrollProcessingMethodRepository payrollProcessingMethodRepository;
        private readonly ISystemVariableValuesRepository systemVariableValuesRepository;

        public EOSAccrualService(IEOSAccrualRepository eosAccrualRepository, IPayrollProcessingMethodRepository payrollProcessingMethodRepository,
            IEOSAccrualSummaryRepository eosAccrualSummaryRepository, ISystemVariableValuesRepository systemVariableValuesRepository)
        {
            this.eosAccrualRepository = eosAccrualRepository;
            this.payrollProcessingMethodRepository = payrollProcessingMethodRepository;
            this.eosAccrualSummaryRepository = eosAccrualSummaryRepository;
            this.systemVariableValuesRepository = systemVariableValuesRepository;
        }

        public async Task<int> GenerateEndOfServiceAvailed(EOSAccrual endOfServiceAvailed)
        {
            //Make an entry in the eos accrual table with value in availdays and availamount 
            //Make an entry in the eos accrual summary table - reducing the availdays from the accrueddays for specific employee
            //AvailAmount to be sent in the eos availed details 

            //EOSAccrual employeeEOSAccrual = new EOSAccrual();
            //EOSAccrualSummary eosAccrualSummary = new EOSAccrualSummary();

            //if (endOfServiceAvailed != null)
            //{
            //    employeeEOSAccrual.EmployeeId = endOfServiceAvailed.EmployeeId;
            //    employeeEOSAccrual.AccrualStatus = 0; //Pending
            //    employeeEOSAccrual.IsArchived = false;
            //    employeeEOSAccrual.AvailAmount = 0;
            //    employeeEOSAccrual.AvailDays = endOfServiceAvailed.AvailDays;
            //    //employeeEOSAccrual.LeaveId = endOfServiceAvailed.LeaveId;

            //    // Get previous accrual summary details for this employee
            //    DateTime now = DateTime.Now;
            //    var prevEOSAccrualSummaryDetails = await eosAccrualSummaryRepository.GetPreviousEOSAccrualSummary(endOfServiceAvailed.EmployeeId);

            //    if (prevEOSAccrualSummaryDetails != null)
            //    {
            //        employeeEOSAccrual.EmployeeId = endOfServiceAvailed.EmployeeId;
            //        employeeEOSAccrual.AvailDays = endOfServiceAvailed.AvailDays;
            //        employeeEOSAccrual.AvailAmount = endOfServiceAvailed.AvailAmount;
            //        //employeeEOSAccrual.LeaveId = endOfServiceAvailed.LeaveId;
            //        employeeEOSAccrual.AccrualDate = endOfServiceAvailed.AccrualDate;
            //        employeeEOSAccrual.AccrualDays = (decimal)prevEOSAccrualSummaryDetails.AccrualDays - endOfServiceAvailed.AvailDays;
            //        employeeEOSAccrual.AccrualAmount = prevEOSAccrualSummaryDetails.AccrualAmount - endOfServiceAvailed.AvailAmount;
            //    }
            //    var result = await leaveAccrualRepository.InsertAsync(employeeLeaveAccrual);
            //    return await leaveAccrualSummaryRepository.InsertAsync(leaveAccrualSummary);
            //}
            //else
            //{
            //    throw new ResourceNotFoundException("Leave availed details is null.");
            //}
            return 0;
        }

        public async Task<IEnumerable<EOSAccrual>> GenerateEndOfServiceAccruals(int paygroupid)
        {
            List<EOSAccrual> eosAccruals = new List<EOSAccrual>();

            var employeeEOSEligibilityDetails = await payrollProcessingMethodRepository.GetProcessedEmployeeDetailsForEOSAccrual(paygroupid);
            foreach (var eligibleEmployee in employeeEOSEligibilityDetails)
            {
                var now = DateTime.Now;
                int daysInMonth = DateTime.DaysInMonth(now.Year, now.Month);

                EOSAccrual eosAccrualEmployee = new EOSAccrual();
                eosAccrualEmployee.EmployeeId = eligibleEmployee.EmployeeId;
                eosAccrualEmployee.EmployeeCode = eligibleEmployee.EmployeeCode;
                eosAccrualEmployee.EmployeeName = eligibleEmployee.EmployeeName;
                eosAccrualEmployee.AccrualStatus = 0; //Pending
                eosAccrualEmployee.AccrualDate = new DateTime(now.Year, now.Month, daysInMonth); // Insert accrual date as end of month eg : 31/05/2023
                eosAccrualEmployee.IsArchived = false;
                eosAccrualEmployee.AvailAmount = 0;
                eosAccrualEmployee.AvailDays = 0;
                eosAccrualEmployee.EligibleDays = 0;
                eosAccrualEmployee.IsIncludeLOPDays = eligibleEmployee.IncludeLOPDays;
                eosAccrualEmployee.MonthlyAmount = eligibleEmployee.MonthlyAmount;

                var systemVariableValues = await systemVariableValuesRepository.GetSystemVariableValuesByEmployeeId(eligibleEmployee.EmployeeId);
                if (systemVariableValues != null)
                {
                    eosAccrualEmployee.EligibilityBase = systemVariableValues.FirstOrDefault(x => x.code == "Wkg_Dys_Frm_Jng").TransValue; //Wkg_dys_Cldr_yer
                    eosAccrualEmployee.EligibilityPerDay = (decimal)eosAccrualEmployee.EligibleDays / eosAccrualEmployee.EligibilityBase;
                    eosAccrualEmployee.WorkingdaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Wkg_Dys_Cldr_Mth").TransValue;
                    eosAccrualEmployee.WorkeddaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Wkd_Dys_Cldr_Mth").TransValue;
                    eosAccrualEmployee.LopDaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Lop_Dys_Cldr_mth").TransValue;
                }


                if (eligibleEmployee.RetrospectiveAccrual)
                {
                    //if salary increased, then if retrospective check prev entry
                }

                // Get previous accrual summary details for eligible employee
                //var prevAccrualSummaryDetails = await eosAccrualSummaryRepository.GetPreviousEOSAccrualSummary(eligibleEmployee.EmployeeId);
                var firstDayNextMonth = new DateTime(now.Year, now.Month, 1).AddMonths(+1); // First day next month - LeaveSUmmary entered for next month
                // leaveAccrualSummary.AccrualDate = firstDayNextMonth;

                //if (firstDayNextMonth <= prevAccrualSummaryDetails.AccrualDate)
                //{
                //    throw new ResourceNotFoundException("EOS Accrual already generated for the month " + prevAccrualSummaryDetails.AccrualDate);
                //}

                //Check if the employee is in probation period and if includeProbationdays no - then no accrual to be generated

                //Need to check on the LOP days logic 
                if (eligibleEmployee.IncludeLOPDays)
                {
                    eosAccrualEmployee.AccrualDays = eosAccrualEmployee.EligibilityPerDay * (eosAccrualEmployee.WorkeddaysInCalMonth - eosAccrualEmployee.LopDaysInCalMonth);
                }
                else
                {
                    eosAccrualEmployee.AccrualDays = eosAccrualEmployee.EligibilityPerDay * eosAccrualEmployee.WorkingdaysInCalMonth;
                }


                eosAccrualEmployee.AccrualAmount = ((decimal)eligibleEmployee.MonthlyAmount / eosAccrualEmployee.EligibleDays) * eosAccrualEmployee.AccrualDays;
                eosAccruals.Add(eosAccrualEmployee);
            }
            return eosAccruals;
        }

        public async Task<int> SaveEndOfServiceAccruals(List<EOSAccrual> endOfServiceAccruals)
        {
            var result = await eosAccrualRepository.BulkInsertAsync(endOfServiceAccruals);
            //return result;
            return 0;
        }

        public async Task<List<LeaveAccrual>> GetGeneratedLeaveAccruals(int paygroupid, DateTime accrualDate)
        {

            var employeeLeaveEligibilityDetails = await payrollProcessingMethodRepository.GetProcessedEmployeeDetailsForEOSAccrual(paygroupid);
            List<int> employeeIds = new List<int>();
            employeeIds = employeeLeaveEligibilityDetails.Select(c => c.Id).ToList();

            return (List<LeaveAccrual>)await eosAccrualRepository.GetProcessedEOSAccruals(accrualDate);
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
