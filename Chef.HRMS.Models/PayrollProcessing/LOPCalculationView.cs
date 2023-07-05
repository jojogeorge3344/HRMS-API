using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class LOPCalculationView : ViewModel
    {
        public decimal LOPCount { get; set; }
        public int EmployeeId { get; set; }
        public int PayGroupId { get; set; }
        public double MonthlyAmount { get; set; }
        public int PayrollComponentId { get; set; }
        public string LeaveComponentCode { get; set; }
        public string LeaveComponentName { get; set; }
        public int LeaveId { get; set; }
        public double TotalAmount { get; set; }
    }
}
