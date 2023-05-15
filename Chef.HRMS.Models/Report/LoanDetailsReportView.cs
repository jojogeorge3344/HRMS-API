using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class LoanDetailsReportView : ViewModel
    {
        public int LoanAmount { get; set; }
        public int RepaymentAmount { get; set; }
    }
}
