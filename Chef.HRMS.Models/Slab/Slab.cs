using Chef.Common.Core;

namespace Chef.HRMS.Models.Slab;

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
