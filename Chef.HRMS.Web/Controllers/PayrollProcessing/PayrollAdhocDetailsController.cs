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

namespace Chef.HRMS.Web.Controllers;

	[Route("api/settings/payrollprocessing/[controller]")]
	[ApiController]
	public class PayrollAdhocDetailsController : ControllerBase
	{
		private readonly IPayrollAdhocDetailsService payrollAdhocDetailsService;
		public PayrollAdhocDetailsController(IPayrollAdhocDetailsService payrollAdhocDetailsService)
		{
			this.payrollAdhocDetailsService = payrollAdhocDetailsService;
		}
		[HttpPost]
		[Route("Insert")]
		public async Task<IActionResult> Insert([FromBody] List<PayrollAdhocDetails> payrollAdhocDetails)
		{
			return Ok(await payrollAdhocDetailsService.BulkInsertAsync(payrollAdhocDetails));
		}
	}
