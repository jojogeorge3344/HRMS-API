using Chef.Common.Core;
using Chef.HRMS.Types;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class PayrollProcessingMethod : Model
{
    /// <summary>
    /// Holds the name
    /// </summary>
    [Required]
    public string Name { get; set; }

    /// <summary>
    /// Holds the mode of processing paygroup/employee
    /// </summary>
    [Required]
    public ModeOfProcessing ModeOfProcessing { get; set; }

    /// <summary>
    /// Holds month
    /// </summary>
    [Required]
    public int Month { get; set; }

    /// <summary>
    /// Holds year
    /// </summary>
    [Required]
    public int Year { get; set; }

    /// <summary>
    /// Holds paygroup id
    /// </summary>
    //[ForeignKey("PayGroup")]
    public int PayGroupId { get; set; }

    /// <summary>
    /// Holds employee id
    /// </summary>
    //[ForeignKey("Employee")]
    public int EmployeeId { get; set; }

    /// <summary>
    /// Holds paygroup or employee name
    /// </summary>
    public string PayGroupOrEmployeeName { get; set; }

    /// <summary>
    /// Holds the processed step of payroll processing
    /// </summary>
    public ProcessedStep ProcessedStep { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int StartingYear { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public int StartingMonth { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string EmployeeCode { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string EmployeeName { get; set; }
}
