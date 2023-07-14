using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class WeekOff : Model
{
    public string Code { get; set; }
    public string WeekNameStart { get; set; }
    public string WeekNameEnd { get; set; }
    public string WeekDateStart { get; set; }
    public string WeekDateEnd { get; set; }
    public bool Status { get; set; }
}
