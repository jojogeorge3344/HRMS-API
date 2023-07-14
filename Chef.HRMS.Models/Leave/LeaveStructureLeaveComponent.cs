using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

[TableType("junctiontable")]
public class LeaveStructureLeaveComponent : Model
{
    /// <summary>
    /// Holds leave type ids
    /// </summary>
    [ForeignKey("LeaveComponent")]
    public int LeaveComponentId { get; set; }

    /// <summary>
    /// Holds leave plan id
    /// </summary>
    [ForeignKey("LeaveStructure")]
    public int LeaveStructureId { get; set; }

    /// <summary>
    /// Holds the details leave setting is configured
    /// </summary>
    [Description("Leave setting is configured")]
    public bool IsConfigured { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int EligibleDays { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int MaxLeaveAtaTime { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int EligibilityBase { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public bool IsCarryForward { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int MaxLeaveAtATime { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int CFLimitDays { get; set; }
}