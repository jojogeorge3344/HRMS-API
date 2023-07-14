using Chef.Common.Core;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class OnDuty : Model
{
    /// <summary>
    /// Holds from date of on duty
    /// </summary>
    [Required]
    [Description("From date of on duty")]
    public DateTime FromDate { get; set; }

    /// <summary>
    /// Holds from date of on duty
    /// </summary>
    [Required]
    [Description("To date of on duty")]
    public DateTime ToDate { get; set; }

    /// <summary>
    /// Holds the value of if first day is a full day on duty
    /// </summary>
    [Description("Is full day on duty")]
    public bool IsFullDay { get; set; }

    /// <summary>
    /// Holds the value of if first day first half is on duty
    /// </summary>
    [Description("Is first day first half on duty")]
    public bool IsFirstDayFirstHalf { get; set; }

    /// <summary>
    /// Holds the value of if first day second half is on duty
    /// </summary>

    [Description("Is first day second half on duty")]
    public bool IsFirstDaySecondHalf { get; set; }

    /// <summary>
    /// Holds the value of if second day first half is on duty
    /// </summary>
    [Description("Is second day first half on duty")]
    public bool IsSecondDayFirstHalf { get; set; }

    /// <summary>
    /// Holds the value of if second day second half is on duty
    /// </summary>
    [Description("Is second day second half on duty")]
    public bool IsSecondDaySecondHalf { get; set; }

    /// <summary>
    /// Holds the number of days taking on duty
    /// </summary>
    [Description("Number of days taking on duty")]
    public decimal NumberOfDays { get; set; }

    /// <summary>
    /// Holds reason of on duty
    /// </summary>
    [Required]
    [StringLength(128)]
    [Description("Reason for on duty")]
    public string Reason { get; set; }

    /// <summary>
    /// Holds the details of requested person
    /// </summary>
    [Required]
    [ForeignKey("Employee")]
    [Description("On duty requested by")]
    public int EmployeeId { get; set; }

    /// <summary>
    /// Holds the approved status
    /// </summary>
    public bool IsApproved { get; set; }
}
