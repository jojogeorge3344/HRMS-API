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
	public class PayrollLoanDetailsController : ControllerBase
	{
		private readonly IPayrollLoanDetailsService payrollLoanDetailsService;
		public PayrollLoanDetailsController(IPayrollLoanDetailsService payrollLoanDetailsService)
		{
			this.payrollLoanDetailsService = payrollLoanDetailsService;
		}
		[HttpPost]
		[Route("Insert")]
		public async Task<IActionResult> Insert([FromBody] List<PayrollLoanDetails> payrollLoanDetails)
		{
			return Ok(await payrollLoanDetailsService.BulkInsertAsync(payrollLoanDetails));
		}
	}
}