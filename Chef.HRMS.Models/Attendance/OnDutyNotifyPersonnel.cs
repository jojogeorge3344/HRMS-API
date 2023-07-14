using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class OnDutyNotifyPersonnel : Model
{
    /// <summary>
    /// Holds the requested id of on duty
    /// </summary>
    [ForeignKey("OnDuty")]
    [Description("On duty id")]
    public int OnDutyId { get; set; }

    /// <summary>
    /// Holds the details of notified person
    /// </summary>
    [ForeignKey("Employee")]
    [Description("Who all will notify this request")]
    public int NotifyPersonnel { get; set; }
}
