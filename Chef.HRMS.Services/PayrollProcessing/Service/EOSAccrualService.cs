using Chef.Common.Exceptions;
using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using Chef.HRMS.Repositories;
using Chef.HRMS.Services.PayrollProcessing.Interface;
using System;
using System.Linq;

namespace Chef.HRMS.Services.PayrollProcessing.Service;

public class EOSAccrualService : AsyncService<EOSAccrual>, IEOSAccrualService
{
    private readonly IEOSAccrualRepository eosAccrualRepository;
    private readonly IEOSAccrualSummaryRepository eosAccrualSummaryRepository;
    private readonly IPayrollProcessingMethodRepository payrollProcessingMethodRepository;
    private readonly ISystemVariableValuesRepository systemVariableValuesRepository;
    private readonly ISlabRepository slabRepository;


    public EOSAccrualService(IEOSAccrualRepository eosAccrualRepository, IPayrollProcessingMethodRepository payrollProcessingMethodRepository,
        IEOSAccrualSummaryRepository eosAccrualSummaryRepository, ISystemVariableValuesRepository systemVariableValuesRepository, ISlabRepository slabRepository)
    {
        this.eosAccrualRepository = eosAccrualRepository;
        this.payrollProcessingMethodRepository = payrollProcessingMethodRepository;
        this.eosAccrualSummaryRepository = eosAccrualSummaryRepository;
        this.systemVariableValuesRepository = systemVariableValuesRepository;
        this.slabRepository = slabRepository;
    }

    public async Task<int> GenerateEndOfServiceAvailed(EOSAccrual endOfServiceAvailed)
    {
        //Make an entry in the eos accrual table with value in availdays and availamount 
        //Make an entry in the eos accrual summary table - reducing the availdays from the accrueddays for specific employee
        //AvailAmount to be sent in the eos availed details 

        EOSAccrual employeeEOSAccrual = new EOSAccrual();
        EOSAccrualSummary eosAccrualSummary = new EOSAccrualSummary();

        if (endOfServiceAvailed != null)
        {
            employeeEOSAccrual.EmployeeId = endOfServiceAvailed.EmployeeId;
            employeeEOSAccrual.AccrualStatus = 0; //Pending
            employeeEOSAccrual.IsArchived = false;
            employeeEOSAccrual.AvailAmount = 0;
            employeeEOSAccrual.AvailDays = endOfServiceAvailed.AvailDays;

            // Get previous accrual summary details for this employee
            DateTime now = DateTime.Now;
            var prevEOSAccrualSummaryDetails = await eosAccrualSummaryRepository.GetPreviousEOSAccrualSummary(endOfServiceAvailed.EmployeeId);

            if (prevEOSAccrualSummaryDetails != null)
            {
                eosAccrualSummary.EmployeeId = endOfServiceAvailed.EmployeeId;
                eosAccrualSummary.AvaillDays = endOfServiceAvailed.AvailDays;
                eosAccrualSummary.AvailAmount = endOfServiceAvailed.AvailAmount;
                eosAccrualSummary.AccrualDate = endOfServiceAvailed.AccrualDate;
                eosAccrualSummary.AccrualDays = prevEOSAccrualSummaryDetails.AccrualDays - endOfServiceAvailed.AvailDays;
                eosAccrualSummary.AccrualAmount = prevEOSAccrualSummaryDetails.AccrualAmount - endOfServiceAvailed.AvailAmount;
            }
            var result = await eosAccrualRepository.InsertAsync(employeeEOSAccrual);
            return await eosAccrualSummaryRepository.InsertAsync(eosAccrualSummary);
        }
        else
        {
            throw new ResourceNotFoundException("EOS availed details is null.");
        }
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
            eosAccrualEmployee.PayrollProcessingId = eligibleEmployee.payrollprocessingid;
            eosAccrualEmployee.AccrualStatus = 0; //Pending
            eosAccrualEmployee.AccrualDate = new DateTime(now.Year, now.Month, daysInMonth); // Insert accrual date as end of month eg : 31/05/2023
            eosAccrualEmployee.IsArchived = false;
            eosAccrualEmployee.AvailAmount = 0;
            eosAccrualEmployee.AvailDays = 0;
            eosAccrualEmployee.IsIncludeLOPDays = eligibleEmployee.IncludeLOPDays;
            eosAccrualEmployee.MonthlyAmount = eligibleEmployee.MonthlyAmount;
            decimal WorkingDaysFromJoining = 0;
            var systemVariableValues = await systemVariableValuesRepository.GetSystemVariableValuesByEmployeeId(eligibleEmployee.EmployeeId);
            if (systemVariableValues != null)
            {
                eosAccrualEmployee.EligibilityBase = 365;
                WorkingDaysFromJoining = systemVariableValues.FirstOrDefault(x => x.code == "Wkg_Dys_Frm_Jng").TransValue;
                eosAccrualEmployee.WorkingdaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Wkg_Dys_Cldr_Mth").TransValue;
                eosAccrualEmployee.WorkeddaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Wkd_Dys_Cldr_Mth").TransValue;
                eosAccrualEmployee.LopDaysInCalMonth = systemVariableValues.FirstOrDefault(x => x.code == "Lop_Dys_Cldr_mth").TransValue;
                eosAccrualEmployee.EligibleDays = eosAccrualEmployee.WorkeddaysInCalMonth;
                eosAccrualEmployee.EligibilityPerDay = eosAccrualEmployee.EligibleDays / eosAccrualEmployee.EligibilityBase;
            }

            //Check if the employee is in probation period and if includeProbationdays no - then no accrual to be generated
            int employeeDurationInOrganization = DateTime.Now.Subtract(eligibleEmployee.DateOfJoin).Days;
            var slab = await slabRepository.GetSlabByEOS(eligibleEmployee.eosid, employeeDurationInOrganization);

            DateTime empProbationEndDate = eligibleEmployee.DateOfJoin.AddDays(eligibleEmployee.ProbationPeriod);
            if (!eligibleEmployee.IncludeProbationDays && (DateTime.Now < empProbationEndDate))
            {
                eosAccrualEmployee.AccrualAmount = 0;
                eosAccrualEmployee.AccrualDays = 0;
            }
            else
            {
                eosAccrualEmployee.EligibilityPerDay = eosAccrualEmployee.EligibleDays / eosAccrualEmployee.EligibilityBase;
                var prevAccrualSummaryDetails = await eosAccrualSummaryRepository.GetPreviousEOSAccrualSummary(eligibleEmployee.EmployeeId);
                decimal accrualDaysWithSlab = 0;
                if (eligibleEmployee.RetrospectiveAccrual && prevAccrualSummaryDetails != null)
                {
                    //if salary increased, then if retrospective check prev entrys and find the amount difference
                    // Get previous accrual summary details for eligible employee
                    eosAccrualEmployee.IsRetrospectiveAccrual = true;
                    if (eligibleEmployee.IncludeLOPDays)
                    {
                        eosAccrualEmployee.EligibleDays = eosAccrualEmployee.WorkeddaysInCalMonth;
                        accrualDaysWithSlab = slab.ValueVariable - eosAccrualEmployee.LopDaysInCalMonth;
                    }
                    else
                    {
                        eosAccrualEmployee.EligibleDays = eosAccrualEmployee.WorkingdaysInCalMonth;
                        accrualDaysWithSlab = slab.ValueVariable;
                    }

                    eosAccrualEmployee.EligibilityPerDay = eosAccrualEmployee.EligibleDays / eosAccrualEmployee.EligibilityBase;
                    eosAccrualEmployee.AccrualDays = eosAccrualEmployee.EligibilityPerDay * accrualDaysWithSlab;
                    eosAccrualEmployee.AccrualAmount = ((eligibleEmployee.MonthlyAmount / eosAccrualEmployee.EligibleDays)
                                * (eosAccrualEmployee.AccrualDays + prevAccrualSummaryDetails.AccrualDays)) - prevAccrualSummaryDetails.AccrualAmount;
                }
                else
                {
                    //Eligibilityperday is based on workeddayincalmonth from system variable o
                    if (eligibleEmployee.IncludeLOPDays)
                    {
                        eosAccrualEmployee.EligibleDays = eosAccrualEmployee.WorkeddaysInCalMonth;
                        accrualDaysWithSlab = slab.ValueVariable - eosAccrualEmployee.LopDaysInCalMonth;
                    }
                    else
                    {
                        eosAccrualEmployee.EligibleDays = eosAccrualEmployee.WorkingdaysInCalMonth;
                        accrualDaysWithSlab = slab.ValueVariable;
                    }
                    eosAccrualEmployee.EligibilityPerDay = eosAccrualEmployee.EligibleDays / eosAccrualEmployee.EligibilityBase;
                    eosAccrualEmployee.AccrualDays = eosAccrualEmployee.EligibilityPerDay * accrualDaysWithSlab;
                    eosAccrualEmployee.AccrualAmount = (eligibleEmployee.MonthlyAmount / eosAccrualEmployee.EligibleDays) * eosAccrualEmployee.AccrualDays;
                }
            }

            eosAccruals.Add(eosAccrualEmployee);
        }
        return eosAccruals;
    }

    public async Task<int> InsertEOSAccruals(List<EOSAccrual> endOfServiceAccruals)
    {
        var result = await eosAccrualRepository.BulkInsertAsync(endOfServiceAccruals);
        return result;
    }

    public async Task<List<EOSAccrual>> GetGeneratedEOSAccruals(int payrollprocessid)
    {
        // Get paygroupid and get employeeid for that paygroup and generated accruals based on that 
        return (List<EOSAccrual>)await eosAccrualRepository.GetEOSAccrualsByPayrollProcessingId(payrollprocessid);
    }
}
