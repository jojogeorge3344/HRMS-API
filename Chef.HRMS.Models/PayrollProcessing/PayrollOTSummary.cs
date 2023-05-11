using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
	public class PayrollOTSummary : Model
	{
		public int PayrollProcessId { get; set; }
		public DateTime PayrollProcessDate { get; set; }
		public int EmployeeId { get; set; }
		public decimal TotalNot { get; set; }
		public decimal TotalHot { get; set; }
		public decimal TotalSot { get; set; }
		public decimal Notrate { get; set; }
		public decimal Hotrate { get; set; }
		public decimal Sotrate { get; set; }
		public decimal TotalNotAmount { get; set; }
		public decimal TotalHotAmount { get; set; }
		public decimal TotalSotAmount { get; set; }
		public int ProcessStatus { get; set; }
	}
}
