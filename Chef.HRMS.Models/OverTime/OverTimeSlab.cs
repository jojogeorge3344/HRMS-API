using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class OverTimeSlab : Model
    {
        public int LowerLimit { get; set; }
        public int UpperLimit { get; set; }
        public int ValueVariable { get; set; }
        public Chef.HRMS.Types.ValueType ValueType { get; set; }
        public int OverTimePolicyId { get; set; }
        public string OverTimePolicyCode { get;set; }
    }
}
