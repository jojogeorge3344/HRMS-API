using Chef.Common.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

[TableType("junctiontable")]
public class LeaveComponentRestrictionSettings : Model
{
    /// <summary>
    /// Holds the value of whether an employee can apply leave for a future date
    /// </summary>
    public bool CanApplyForFutureDate { get; set; }

    /// <summary>
    /// Holds the value of whether an employee can apply half day leave
    /// </summary>
    public bool CanApplyHalfDay { get; set; }

    /// <summary>
    /// Holds the value of whether an employee can apply leave during notice period
    /// </summary>
    public bool CanApplyLeaveDuringNoticePeriod { get; set; }

    /// <summary>
    /// Holds the value of whether an employee can apply for leave during probation
    /// </summary>
    public bool CanApplyLeaveDuringProbation { get; set; }

    /// <summary>
    /// Holds the value of whether an employee can apply for leave
    /// </summary>
    public bool CanEmployeeApplyLeave { get; set; }

    /// <summary>
    /// Holds the value of whether the reporting manager can allocate leave credits 
    /// </summary>
    public bool CanReportingManagerAllocateLeaveCredit { get; set; }

    /// <summary>
    /// Holds the value of whether the reporting manager can override th restrictions
    /// </summary>
    public bool CanReportingManagerOverrideRestrictions { get; set; }

    /// <summary>
    /// Holds the value of leave approvaal required or not
    /// </summary>
    public bool IsLeaveApprovalRequired { get; set; }

    /// <summary>
    /// Holds the leave component Id
    /// </summary>
    [ForeignKey("LeaveComponent")]
    public int LeaveComponentId { get; set; }

    /// <summary>
    /// Holds the leave structure Id
    /// </summary>
    [ForeignKey("LeaveStructure")]
    public int LeaveStructureId { get; set; }
}