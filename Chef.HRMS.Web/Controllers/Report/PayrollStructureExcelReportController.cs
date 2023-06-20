using Chef.HRMS.Services;
using Chef.HRMS.Services.Report;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PayrollStructureExcelController : ControllerBase
    {
        private readonly IPayrollStructureReportService payrollStructureReportService;
        public PayrollStructureExcelController(IPayrollStructureReportService payrollStructureReportService) 
        {
            this.payrollStructureReportService = payrollStructureReportService;
        }

        [HttpGet("PayrollStructureExcelReport/{fromDate}/{ToDate}/{designationIds}/{employeeIds}/{departmentIds}")]
        public async Task<ActionResult<byte[]>> PayrollStructureExcelReport(DateTime fromDate, DateTime ToDate, string designationIds, string employeeIds, string departmentIds)
        {
            return await payrollStructureReportService.PayrollStructureExcelReport(fromDate, ToDate, designationIds, employeeIds, departmentIds);
        }
    }
}
