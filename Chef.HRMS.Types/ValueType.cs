using System.ComponentModel;

namespace Chef.HRMS.Types;

public enum ValueType
{
    [Description("NUMBER/%")]
    NUMBERPERCENT = 1,

    [Description("NUMBER")]
    NUMBERS = 2
}
