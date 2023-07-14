using Chef.Common.Core;
using Chef.HRMS.Types;

namespace Chef.HRMS.Models;

public class UserVariable : Model
{
    //[Required]
    //[StringLength(128)]
    public string Name { get; set; }
    public string Code { get; set; }
    public bool Status { get; set; }
    public UserVariableType Type { get; set; }
}
