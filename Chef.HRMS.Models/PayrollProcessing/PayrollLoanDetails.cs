using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Chef.HRMS.Models
{
	public class PayrollLoanDetails : Model
	{
		public int PayrollProcessId { get; set; }
		public DateTime PayrollProcessDate { get; set; }
		public int EmployeeId { get; set; }
		public int LoanDetailsId { get; set; }
		public decimal LoanAmount { get; set; }
		public int ProcessStatus { get; set; }
	}
}
