using Chef.Common.Core;

namespace Chef.HRMS.Models;

public class AttendanceAdminStatsView : Model
{
    /// <summary>
    /// Holds type of attendance
    /// </summary>
    public string AttendanceType { get; set; }

    /// <summary>
    /// Holds count
    /// </summary>
    public int Count { get; set; }
}
