using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class OverTime : Model
{

    /// <summary>
    /// Holds from details of over time policy id
    /// </summary>
    [Required]
    [ForeignKey("OverTimePolicy")]
    [Description("Over Time Policy Id")]
    public int OverTimePolicyId { get; set; }

    /// <summary>
    /// Holds from date of over time
    /// </summary>
    [Required]
    [Description("From date of over time")]
    public DateTime FromDate { get; set; }

    /// <summary>
    /// Holds from date of over time
    /// </summary>
    [Required]
    [Description("To date of over time")]
    public DateTime ToDate { get; set; }

    /// <summary>
    /// Holds the number of days taking over time
    /// </summary>
    [Description("Number of hours taking over time")]
    public decimal NumberOfHours { get; set; }

    /// <summary>
    /// Holds reason of over time
    /// </summary>
    //[Required]
    [StringLength(128)]
    [Description("Reason for over time")]
    public string Reason { get; set; }

    /// <summary>
    /// Holds the details of requested person
    /// </summary>
    [Required]
    [ForeignKey("Employee")]
    [Description("Over time requested by")]
    public int EmployeeId { get; set; }

    /// <summary>
    /// Holds the approved status
    /// </summary>
    public RequestStatusType RequestStatus { get; set; }

    public int NormalOverTime { get; set; }

    public int SpecialOverTime { get; set; }

    public int HolidayOverTime { get; set; }

    public string EmployeeName { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string EmployeeNumber { get; set; }
}
