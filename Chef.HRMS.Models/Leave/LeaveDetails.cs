using Chef.Common.Core;
using Chef.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
	public class LeaveDetails : Model
	{
		public int EmployeeId { get; set; }
		public int LeaveId { get; set; }
		public int LeavecomponentId { get; set; }
		public int Leavetype { get; set; }
		public DateTime LeaveDate { get; set; }
		public int Leavestatus { get; set; }
		public int PayrollId { get; set; }
		public int PayrollStatus { get; set; }
	}
}
