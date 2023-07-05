using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class FinalSettlementComponetsView
    {
        public int OrderNumber { get; set; }
        public int PayrollComponentId { get; set; }
        public string ShortCode { get; set; }
        public string Name { get; set; }
        public LOPCalculationView lOPCalculationView { get; set; }
        public OverTimePayrollViewModel overTimePayrollViewModel { get; set; }
    }
}
