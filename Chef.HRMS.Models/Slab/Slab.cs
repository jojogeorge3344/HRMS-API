using Chef.Common.Core;
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
        public int ValueVariable { get; set; }
        public string valuetype { get; set; }
        public int EOSId { get; set; }
    }
}
