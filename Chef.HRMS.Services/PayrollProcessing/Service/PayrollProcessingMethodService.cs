using Chef.Common.Repositories;
using Chef.HRMS.Models;
using Chef.HRMS.Models.PayrollProcessing;
using Chef.HRMS.Repositories;
using System;
using System.Linq;

namespace Chef.HRMS.Services;

public class PayrollProcessingMethodService : AsyncService<PayrollProcessingMethod>, IPayrollProcessingMethodService
{
    private readonly IPayrollProcessingMethodRepository payrollProcessingMethodRepository;
    private readonly IPayGroupRepository payGroupRepository;
    private readonly ISystemVariableValuesRepository systemVariableValuesRepository;
    private readonly ITenantSimpleUnitOfWork tenantSimpleUnitOfWork;

    public PayrollProcessingMethodService(IPayrollProcessingMethodRepository payrollProcessingMethodRepository,
        IPayGroupRepository payGroupRepository,
        ISystemVariableValuesRepository systemVariableValuesRepository,
        ITenantSimpleUnitOfWork tenantSimpleUnitOfWork)
    {
        this.payrollProcessingMethodRepository = payrollProcessingMethodRepository;
        this.payGroupRepository = payGroupRepository;
        this.systemVariableValuesRepository = systemVariableValuesRepository;
        this.tenantSimpleUnitOfWork = tenantSimpleUnitOfWork;
    }

    public async Task<IEnumerable<PayrollProcessingMethod>> GetAllByProcessignStep(int stepno)
    {
        return await payrollProcessingMethodRepository.GetAllByProcessignStep(stepno);
    }
    public async Task<IEnumerable<PayrollReview>> GetAllPayrollReviewByProcessingMethodId(int payrollProcessingMethodId)
    {
        return await payrollProcessingMethodRepository.GetAllPayrollReviewByProcessingMethodId(payrollProcessingMethodId);
    }

    public async Task<IEnumerable<HRMSEmployee>> GetAllUnProcessedEmployees(int year, int month)
    {
        return await payrollProcessingMethodRepository.GetAllUnProcessedEmployees(year, month);
    }

    public async Task<int> GetDetailsById(int employeeid, int month, int year)
    {
        return await payrollProcessingMethodRepository.GetDetailsById(employeeid, month, year);
    }

    public async Task<IEnumerable<PayrollProcessingMethod>> GetDetailsByPaygroupId(int paygroupid, int prevmonth, int prevyear)
    {
        return await payrollProcessingMethodRepository.GetDetailsByPaygroupId(paygroupid, prevmonth, prevyear);
    }

    public async Task<IEnumerable<PayrollProcessingMethod>> GetEmployeeDetails(int employeeid, int paygroupid)
    {
        return await payrollProcessingMethodRepository.GetEmployeeDetails(employeeid, paygroupid);
    }

    public async Task<IEnumerable<PayrollProcessingMethod>> GetPastSixMonthDetails()
    {
        return await payrollProcessingMethodRepository.GetPastSixMonthDetails();
    }

    public async Task<IEnumerable<PayrollReviewBreakup>> GetPayBreakUpByEmployeeId(int employeeId, int payrollProcessingMethodId)
    {
        return await payrollProcessingMethodRepository.GetPayBreakUpByEmployeeId(employeeId, payrollProcessingMethodId);
    }

    public async Task<IEnumerable<PayrollMonth>> GetPayrollProcessingMonth(int paygroupId)
    {
        bool count = await payrollProcessingMethodRepository.IsPaygroupExistInPayrollProcessingMethod(paygroupId);
        List<PayrollMonth> listMonth = new List<PayrollMonth>();
        
        //if paygroup first time processing,should go to inside the if condition. 
        //if already processed, take else condition.
        if (count == false)
        {
            var paygroupDate = await payGroupRepository.GetAsync(paygroupId);
            if (paygroupDate != null)
            {
                PayrollMonth payrollMonth = new PayrollMonth
                {
                    Month = paygroupDate.StartingMonth,
                    Year = paygroupDate.StartingYear,
                };
                listMonth.Add(payrollMonth);
            }
            return listMonth;
        }
        else
        {
            var lastProcessDetails = await payrollProcessingMethodRepository.GetPayrollProcessingMonth(paygroupId);
            //passing next payroll processing month
            foreach(var payrollMonth in lastProcessDetails)
            {
                int nextMonth = 0;
                int nextYear = 0;

                if(payrollMonth.Month == 12)
                {
                    nextMonth = payrollMonth.Month = 1;
                    nextYear = payrollMonth.Year + 1;
                    listMonth.Add(payrollMonth);
                }
                else
                {
                    nextMonth = payrollMonth.Month + 1;
                    payrollMonth.Month = nextMonth;
                    listMonth.Add(payrollMonth);
                }
            }
            return listMonth;
        }
    }

    public async Task<int> InsertLOPDeduction(IEnumerable<LOPDeduction> lopDeduction)
    {
        return await payrollProcessingMethodRepository.InsertLOPDeduction(lopDeduction);
    }

    public async Task<int> InsertOrAlreadyExist(PayrollProcessingMethod payrollProcessingMethod)
    {
        int payrollProcessingMethodId = 0;
        tenantSimpleUnitOfWork.BeginTransaction();
        try
        {
            payrollProcessingMethodId = await payrollProcessingMethodRepository.InsertOrAlreadyExist(payrollProcessingMethod);
            var payrollProcessingData = await payrollProcessingMethodRepository.GetAsync(payrollProcessingMethodId);
            if (payrollProcessingData != null)
            {
                await systemVariableValuesRepository.InsertSystemVariableDetails(payrollProcessingData.PayGroupId, payrollProcessingMethodId);
            }
            tenantSimpleUnitOfWork.Commit();
            return payrollProcessingMethodId;
        }
        catch
        {
            tenantSimpleUnitOfWork.Rollback();
            return payrollProcessingMethodId;
        }
    }

    public async Task<int> UpadtePayrollProcessingStep(int payrollProcessingMethodId, int completedStep)
    {
        return await payrollProcessingMethodRepository.UpadtePayrollProcessingStep(payrollProcessingMethodId, completedStep);
    }

    public async Task<int> InsertPayrollFixedComponentDetaisl(int payrollProcessId, DateTime payrollprocessdate, int paygroupid)
    {
        return await payrollProcessingMethodRepository.InsertPayrollFixedComponentDetails(payrollProcessId, payrollprocessdate, paygroupid);
    }

    public async Task<IEnumerable<PayrollSummary>> GetPayrollComponentsSummary(int payrollprocessid)
    {
        List<PayrollSummary> payrollSummaries = new List<PayrollSummary>();
        var payrollComponentDetails = await payrollProcessingMethodRepository.GetPayrollComponentsSummary(payrollprocessid);
        var empIdList = payrollComponentDetails.Select(e => e.EmployeeId).Distinct();
        foreach (var empId in empIdList)
        {
            PayrollSummary payrollSummary = new PayrollSummary();

            payrollSummary.PayrollComponentDetails = payrollComponentDetails.Where(x => x.EmployeeId == empId).ToList();
            payrollSummary.TotalDeductions = payrollSummary.PayrollComponentDetails.Sum(c => c.DeductionAmt);
            payrollSummary.EmployeeName = payrollSummary.PayrollComponentDetails.First().EmployeeName;
            payrollSummary.EmployeeCode = payrollSummary.PayrollComponentDetails.First().EmployeeCode;
            payrollSummary.EmployeeId = empId;
            payrollSummary.TotalEarnings = payrollSummary.PayrollComponentDetails.Sum(c => c.EarningsAmt);
            payrollSummary.NetSalaryAmount = payrollSummary.TotalEarnings - payrollSummary.TotalDeductions;
            payrollSummaries.Add(payrollSummary);
        }
        return payrollSummaries;
    }

    public async Task<IEnumerable<PayrollProcessSummaryView>> GetPayrollProcessView(int payrollProcessId)
    {
        List<PayrollProcessSummaryView> payrollSummaryView = new List<PayrollProcessSummaryView>();
        var salaryDetails = await payrollProcessingMethodRepository.GetPayrollProcessSalaryDetails(payrollProcessId);
        var empIdList = salaryDetails.Select(e => e.EmployeeId).Distinct();
        foreach (var empId in empIdList)
        {
            PayrollProcessSummaryView payrollSummary = new PayrollProcessSummaryView();

            payrollSummary.CompletedViews = salaryDetails.Where(x => x.EmployeeId == empId).ToList();
            payrollSummary.TotalDeductions = payrollSummary.CompletedViews.Sum(c => c.DeductionAmt);
            payrollSummary.EmployeeName = payrollSummary.CompletedViews.First().EmployeeName;
            payrollSummary.EmployeeCode = payrollSummary.CompletedViews.First().EmployeeCode;
            payrollSummary.EmployeeId = empId;
            payrollSummary.TotalEarnings = payrollSummary.CompletedViews.Sum(c => c.EarningsAmt);
            payrollSummary.NetSalaryAmount = payrollSummary.TotalEarnings - payrollSummary.TotalDeductions;
            payrollSummaryView.Add(payrollSummary);
        }
        return payrollSummaryView;
    }
}
