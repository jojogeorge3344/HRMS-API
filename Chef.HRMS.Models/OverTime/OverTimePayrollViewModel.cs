using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
	public class OverTimePayrollViewModel:Model
	{
		public decimal nothrs { get; set; }
		public decimal  hothrs { get; set; }
		public decimal sothrs { get; set; }
		public int employeeid { get; set; }
		public decimal notrate { get; set; }
		public decimal hotrate { get; set; }
		public decimal sotrate { get; set; }
		public int  notcomponentid { get; set; }
		public int hotcomponentid { get; set; }
		public int sotcomponentid { get; set; }
		public decimal notamount { get; set; }
		public decimal hotamount { get; set; }
		public decimal sotamount { get; set; }

	}
}
