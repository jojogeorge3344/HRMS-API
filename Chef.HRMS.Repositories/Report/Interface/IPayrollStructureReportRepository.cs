using Chef.HRMS.Models.Report;

namespace Chef.HRMS.Repositories.Report;

public interface IPayrollStructureReportRepository : IGenericRepository<PayrollStructureReportView>
{
    Task<IEnumerable<PayrollStructureReportView>> GetEmployeePayrollProcessDetails(DateTime fromDate, DateTime ToDate, string payrollStructureIds, string paygroupIds, string designationIds, string employeeIds);
    Task<IEnumerable<PayrollComponentExcelReportView>> GetHeaderPayrollComponentNameByDate(DateTime fromDate, DateTime ToDate);
    Task<IEnumerable<PayrollExcelReportView>> GetEmployeePayrollProcessDetailsForExcel(DateTime fromDate, DateTime ToDate, string designationIds, string employeeIds, string departmentIds);
}
