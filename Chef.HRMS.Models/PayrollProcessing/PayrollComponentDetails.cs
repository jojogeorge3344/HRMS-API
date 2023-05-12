using Chef.Common.Core;
using Microsoft.AspNetCore.Http.HttpResults;
using System;
using System.Collections.Generic;
using System.Formats.Asn1;
using System.IO.Compression;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;
using static Humanizer.In;
using static System.Net.Mime.MediaTypeNames;

namespace Chef.HRMS.Models
{
	public class PayrollComponentDetails:Model
	{
		public int PayrollProcessId { get; set; }
		public DateTime PayrollProcessDate { get; set; }
		public int EmployeeId { get; set; }
		public int PayrollComponentId { get; set; }
		public decimal EarningsAmt { get; set; }
		public decimal DeductionAmt { get; set; }
		public int ProcessStatus { get; set; }
		public string DrAccount { get; set; }
		public string CrAccount { get; set; }
		public string DocNum { get; set; }
		public int StepNo { get; set; }
	}
}
