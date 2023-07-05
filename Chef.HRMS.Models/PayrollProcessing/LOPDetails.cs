using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
	public class LOPDetails
	{
		public int LeaveComponentId { get; set; }
		public string LeaveComponentCode { get; set; }
		public string LeaveComponentName { get; set; }
        public decimal Days { get; set; }
	}
}
