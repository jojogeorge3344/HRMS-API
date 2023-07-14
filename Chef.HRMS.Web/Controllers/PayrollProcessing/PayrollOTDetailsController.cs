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
	public class PayrollOTDetailsController :  ControllerBase
	{
		private readonly IPayrollOTSummaryService payrollOTSummaryService;
		public PayrollOTDetailsController(IPayrollOTSummaryService payrollOTSummaryService)
		{
			this.payrollOTSummaryService = payrollOTSummaryService;
		}
		[HttpPost]
		[Route("Insert")]
		public async Task<IActionResult> Insert([FromBody] List<PayrollOTSummary> payrollOTSummary)
		{
			return Ok(await payrollOTSummaryService.BulkInsertAsync(payrollOTSummary));
		}
	}
