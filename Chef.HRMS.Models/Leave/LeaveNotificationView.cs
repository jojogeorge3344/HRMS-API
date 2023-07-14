using Chef.Common.Core;
using System.ComponentModel;

namespace Chef.HRMS.Models;

public class LeaveNotificationView : ViewModel
{
    /// <summary>
    /// Holds the reporting manger id
    /// </summary>
    [Description("Reporting Manager")]
    public int ReportingManager { get; set; }

    /// <summary>
    /// Holds the total count of pending request
    /// </summary>
    [Description("Pending request")]
    public int PendingRequest { get; set; }


}
