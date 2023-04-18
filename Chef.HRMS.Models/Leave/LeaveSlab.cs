using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class LeaveSlab : Model
    {
        public int LowerLimit { get; set; }
        public int UpperLimit { get; set; }
        public int ValueVariable { get; set; }
        public Chef.HRMS.Types.ValueType ValueType { get; set; }
        public int LeaveComponentId { get; set; }
        public string LeaveComponentName { get; set; }
        public string LeaveComponentCode { get; set; }

    }
}
