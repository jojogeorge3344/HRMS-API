using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class LoanAdvanceRepaymentView : ViewModel
    {
        public string PayrollComponentCode { get; set; }
        public string PayrollComponentName { get; set; }
        public int PayrollComponentType { get; set; }
        public string BenefitTypeCode { get; set; }
        public string BenefitTypeName { get; set; }
        public int PayrollComponentId { get; set; }
    }
}
