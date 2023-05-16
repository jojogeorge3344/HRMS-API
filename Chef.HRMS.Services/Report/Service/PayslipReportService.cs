using Chef.HRMS.Models;
using Chef.HRMS.Repositories;
using Chef.HRMS.Repositories.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Services.Report
{
    public class PayslipReportService : AsyncService<PayrollComponentDetails>, IPayslipReportService
    {
        private readonly IPayslipReportRepository payslipReportRepository;

        public PayslipReportService(IPayslipReportRepository payslipReportRepository)
        {
            this.payslipReportRepository = payslipReportRepository;
        }

        public async Task<IEnumerable<PayrollComponentReportView>> EmployeeComponentDetails(string employeeId, DateTime fromDate, DateTime ToDate)
        {
            return await payslipReportRepository.EmployeeComponentDetails(employeeId, fromDate, ToDate);
        }

        public async Task<IEnumerable<PayrollHeaderView>> EmployeeHeaderDetails(string employeeId, DateTime fromDate, DateTime ToDate)
        {
            return await payslipReportRepository.EmployeeHeaderDetails(employeeId, fromDate, ToDate);
        }

        public async Task<IEnumerable<LoanDetailsReportView>> EmployeeLoanDetails(string employeeId, DateTime fromDate, DateTime ToDate)
        {
            return await payslipReportRepository.EmployeeLoanDetails(employeeId, fromDate, ToDate);
        }

        public async Task<IEnumerable<OvertimeDetailReportView>> EmployeeOverTimeDetails(string employeeId, DateTime fromDate, DateTime ToDate)
        {
            return await payslipReportRepository.EmployeeOverTimeDetails(employeeId, fromDate, ToDate);
        }
    }
}
