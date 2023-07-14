using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class LeaveComponentLopDetails : Model
{
    public int LeaveComponentId { get; set; }
    public int PayrollComponentId { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string PayrollComponentName { get; set; }
}
