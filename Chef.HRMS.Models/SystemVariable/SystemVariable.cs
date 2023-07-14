using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class SystemVariable : Model
{
    //[Required]
    //[StringLength(128)]
    public string Name { get; set; }
    public string Code { get; set; }
    public bool Status { get; set; }

    [Write(false)]
    [Skip(false)]
    [SqlKata.Ignore]
    public string Color { get; set; }
}
