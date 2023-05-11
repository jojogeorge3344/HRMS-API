using Chef.HRMS.Models;
using Chef.HRMS.Services;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Web.Controllers
{
    [Route("api/settings/payrollprocessing/[controller]")]
    [ApiController]
    public class PayrollLeaveDetailsController : ControllerBase
    {
        private readonly IPayrollLeaveDetailsService payrollLeaveDetailsService;
        public PayrollLeaveDetailsController(IPayrollLeaveDetailsService payrollLeaveDetailsService)
        {
            this.payrollLeaveDetailsService = payrollLeaveDetailsService;
        }
        [HttpPost]
        [Route("Insert")]
        public async Task<IActionResult> Insert([FromBody] List<PayrollLeaveDetails> payrollLeaveDetails)
        {
            return Ok(await payrollLeaveDetailsService.BulkInsertAsync(payrollLeaveDetails));
        }
    }
}