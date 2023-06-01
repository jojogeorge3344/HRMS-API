using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
	public class SystemVariableEmpId
	{
		public int Id { get; set; }
		public int OverTimePolicyId { get; set; }
		public bool IsOverTimeSlab { get; set; }
		public bool IsMonthly { get; set; }
	}
}
