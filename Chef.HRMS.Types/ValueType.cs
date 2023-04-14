using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Types
{
    public enum ValueType
    {
        [Description("NUMBER/%")]
        NUMBERPERCENT = 1,

        [Description("NUMBER")]
        NUMBERS = 2
    }
}
