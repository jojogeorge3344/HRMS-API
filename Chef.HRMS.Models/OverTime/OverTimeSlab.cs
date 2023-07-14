using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class OverTimeSlab : Model
{
    public int LowerLimit { get; set; }
    public int UpperLimit { get; set; }
    public decimal ValueVariable { get; set; }
    public Chef.HRMS.Types.ValueType ValueType { get; set; }
    public int OverTimePolicyId { get; set; }
    public string OverTimePolicyCode { get; set; }
    public int OverTimeType { get; set; }

}
