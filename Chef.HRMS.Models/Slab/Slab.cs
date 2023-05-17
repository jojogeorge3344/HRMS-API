using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models.Slab
{
    public class Slab : Model
    {
        public int LowerLimit { get; set; }
        public int UpperLimit { get; set; }
        public decimal ValueVariable { get; set; }
        public Chef.HRMS.Types.ValueType ValueType { get; set; }
        public int EOSId { get; set; }
        public string BFCode { get; set; }
        public string BFName { get; set; }
    }
}
