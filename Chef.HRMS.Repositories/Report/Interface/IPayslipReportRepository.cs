namespace Chef.HRMS.Repositories.Report;

public interface IPayslipReportRepository : IGenericRepository<PayrollComponentDetails>
{
    Task<IEnumerable<PayrollHeaderView>> EmployeeHeaderDetails(string employeeIds, DateTime fromDate, DateTime ToDate, string paygroupIds, string departmentIds, string designationIds);
    Task<IEnumerable<PayrollComponentReportView>> EmployeeComponentDetails(string employeeIds, DateTime fromDate, DateTime ToDate, string paygroupIds, string departmentIds, string designationIds);
    Task<IEnumerable<OvertimeDetailReportView>> EmployeeOverTimeDetails(string employeeIds, DateTime fromDate, DateTime ToDate);
    Task<IEnumerable<LoanDetailsReportView>> EmployeeLoanDetails(string employeeIds, DateTime fromDate, DateTime ToDate);

}
