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

        public LeaveAccrualService(ILeaveAccrualRepository leaveAccrualRepository)
        {
            this.leaveAccrualRepository = leaveAccrualRepository;
        }

        public async Task<IEnumerable<LeaveAccrual>> GenerateLeaveAccruals(int paygroupid, bool isavail)
        {

            //Check for leavetype also - 1 - Accrued
            List<LeaveAccrual> leaveAccruals = new List<LeaveAccrual>();
            List<LeaveAccrualSummary> leaveAccrualSummaries = new List<LeaveAccrualSummary>();  
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
                var systemVariableValues = await systemVariableValuesRepository.GetSystemVariableValuesByEmployeeId(eligibleEmployee.EmployeeId);
                if(systemVariableValues != null)
                {
                    decimal workingdaysInCalMonth = systemVariableValues.FirstOrDefault(x=>x.code == "Wkg_Dys_Cldr_Mth").TransValue;
                    decimal workeddaysInCalMonth = systemVariableValues.FirstOrDefault(x=>x.code == "Wkd_Dys_Cldr_Mth").TransValue;

                    if (eligibleEmployee.IsIncludeLOPDays)
                    {
                        leaveAccrualEmployee.AccrualDays = (eligibleEmployee.EligibleDays / eligibleEmployee.EligibilityBase) * (workeddaysInCalMonth);
                    }
                    else
                    {
                        leaveAccrualEmployee.AccrualDays = (eligibleEmployee.EligibleDays / eligibleEmployee.EligibilityBase) * (workingdaysInCalMonth);                       
                    }
                    leaveAccrualEmployee.AccrualAmount = (1 / eligibleEmployee.EligibleDays )*leaveAccrualEmployee.AccrualDays;
                    //Annual Accrual BF Code from Leave Component Amont from Salary structure 
                }

            }
            await leaveAccrualSummaryRepository.BulkInsertAsync(leaveAccrualSummaries);
            await leaveAccrualRepository.BulkInsertAsync(leaveAccruals);
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
