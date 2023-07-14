using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class LOPTracker : Model
{
    /// <summary>
    /// Holds leave  id
    /// </summary>
    [Required]
    [ForeignKey("Leave")]
    public int LeaveId { get; set; }

    /// <summary>
    /// Holds leave requested by user
    /// </summary>
    [Required]
    [ForeignKey("Employee")]
    public int EmployeeId { get; set; }

    /// <summary>
    /// Holds lop calculation id
    /// </summary>
    [Required]
    [ForeignKey("LOPCalculation")]
    public int LOPCalculationId { get; set; }

    /// <summary>
    /// Holds from date
    /// </summary>
    [Required]
    public DateTime FromDate { get; set; }

    /// <summary>
    /// Holds to date
    /// </summary>
    [Required]
    public DateTime ToDate { get; set; }

    /// <summary>
    /// Holds the lop status id
    /// </summary>
    [Required]
    public LOPStatusType LOPStatus { get; set; }

    /// <summary>
    /// Holds the number of days taking the leave
    /// </summary>
    public decimal NumberOfDays { get; set; }

}
