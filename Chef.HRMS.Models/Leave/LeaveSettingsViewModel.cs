using Chef.Common.Core;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class LeaveSettingsViewModel : ViewModel
{
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

    /// <summary>
    /// Holds the maximum consecutive days which a leave can be availed
    /// </summary>
    public int MaxConsecutiveDays { get; set; }

    /// <summary>
    /// Holds the maximum number of days per month which a particular leave can be applied
    /// </summary>
    public int MaxNumberOfDaysPerMonth { get; set; }

    /// <summary>
    /// Holds the value of Number of days gap required between leaves
    /// </summary>
    public int NumberOfDaysGapRequiredBetweenLeaves { get; set; }

    /// <summary>
    /// Holds the value of Do not allocate leave quota if joining date is beyond
    /// </summary>
    public int NoLeaveQuotaAfterJoiningDay { get; set; }

    /// <summary>
    /// Holds the required prior notice (in days)
    /// </summary>
    public int PriorNoticeDays { get; set; }

    /// <summary>
    /// Holds the value of whether an employee can apply half day leave
    /// </summary>
    public bool CanApplyHalfDay { get; set; }

    /// <summary>
    /// Holds the value of whether an employee can apply for leave
    /// </summary>
    public bool CanEmployeeApplyLeave { get; set; }

    /// <summary>
    /// Holds the value of whether an employee can apply leave during notice period
    /// </summary>
    public bool CanApplyLeaveDuringNoticePeriod { get; set; }

    /// <summary>
    /// Holds the value of whether an employee can apply for leave during probation
    /// </summary>
    public bool CanApplyLeaveDuringProbation { get; set; }

    /// <summary>
    /// Holds the value of whether an employee can apply leave for a future date
    /// </summary>
    public bool CanApplyForFutureDate { get; set; }

    /// <summary>
    /// Holds the value of leave approvaal required or not
    /// </summary>
    public bool IsLeaveApprovalRequired { get; set; }

    /// <summary>
    /// Date whic employee joine dthe company
    /// </summary>
    public DateTime DateOfJoin { get; set; }

    /// <summary>
    /// Probation period of employee
    /// </summary>
    public int ProbationPeriod { get; set; }

    /// <summary>
    /// Period type of probation
    /// </summary>
    public int PeriodType { get; set; }

    /// <summary>
    /// Notice period of the employee
    /// </summary>
    public int NoticePeriod { get; set; }
}
