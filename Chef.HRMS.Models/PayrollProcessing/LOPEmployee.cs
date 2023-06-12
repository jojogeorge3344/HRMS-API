using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
	public class LOPEmployee
	{
		public int EmployeeId { get; set; }
		public string LeaveCutOff { get; set; }
		public int PayrollStructureId { get; set; }
	}
}
