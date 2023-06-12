using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class SalaryDetailsReportView : ViewModel
    {
        public decimal Amount { get; set; }
        public string ComponentName { get; set; }
    }
}
