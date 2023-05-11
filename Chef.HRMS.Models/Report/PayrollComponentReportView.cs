using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class PayrollComponentReportView : ViewModel
    {
       public string ShortCode { get; set; }
       public string Name { get; set; }
       public int PayrollComponentId { get; set; }
       public decimal EarningsAmt { get; set; }
       public decimal DeductionAmt { get; set; }
       public int PayHeadBaseUnitType { get; set; }
       public decimal MinimumLimit { get; set; }
        public decimal MaximumLimit { get; set; }
    }
}
