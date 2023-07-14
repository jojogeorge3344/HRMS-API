using Chef.HRMS.Models;
using Chef.HRMS.Repositories.Report;
using System;

namespace Chef.HRMS.Services.Report;

public class PayslipReportService : AsyncService<PayrollComponentDetails>, IPayslipReportService
{
    private readonly IPayslipReportRepository payslipReportRepository;

    public PayslipReportService(IPayslipReportRepository payslipReportRepository)
    {
        this.payslipReportRepository = payslipReportRepository;
    }

    public async Task<IEnumerable<PayrollComponentReportView>> EmployeeComponentDetails(string employeeIds, DateTime fromDate, DateTime ToDate, string paygroupIds, string departmentIds, string designationIds)
    {
        return await payslipReportRepository.EmployeeComponentDetails(employeeIds, fromDate, ToDate, paygroupIds, departmentIds, designationIds);
    }

    public async Task<IEnumerable<PayrollHeaderView>> EmployeeHeaderDetails(string employeeIds, DateTime fromDate, DateTime ToDate, string paygroupIds, string departmentIds, string designationIds)
    {
        return await payslipReportRepository.EmployeeHeaderDetails(employeeIds, fromDate, ToDate, paygroupIds, departmentIds, designationIds);
    }

    public async Task<IEnumerable<LoanDetailsReportView>> EmployeeLoanDetails(string employeeIds, DateTime fromDate, DateTime ToDate)
    {
        return await payslipReportRepository.EmployeeLoanDetails(employeeIds, fromDate, ToDate);
    }

    public async Task<IEnumerable<OvertimeDetailReportView>> EmployeeOverTimeDetails(string employeeIds, DateTime fromDate, DateTime ToDate)
    {
        return await payslipReportRepository.EmployeeOverTimeDetails(employeeIds, fromDate, ToDate);
    }
}
