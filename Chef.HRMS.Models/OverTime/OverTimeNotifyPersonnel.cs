using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class OverTimeNotifyPersonnel : Model
{
    /// <summary>
    /// Holds the requested id of over time
    /// </summary>
    [ForeignKey("OverTime")]
    [Description("over time id")]
    public int OverTimeId { get; set; }

    /// <summary>
    /// Holds the details of notified person
    /// </summary>
    [ForeignKey("Employee")]
    [Description("Who all will notify this request")]
    public int NotifyPersonnel { get; set; }
}
