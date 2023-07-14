using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class BenefitTypes : Model
{
    public string Code { get; set; }
    public string Name { get; set; }
    public int CategoryId { get; set; }
}
