using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
	public class LeaveComponentLopDetails:Model
	{
		public int Id { get; set; }
		public int LeaveComponentId { get; set; }
		public int PayrollComponentId { get; set; }
	}
}
