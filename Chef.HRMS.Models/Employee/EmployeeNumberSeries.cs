using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class EmployeeNumberSeries : Model
{
    /// <summary>
    /// Holds description   
    /// </summary>
    [Required]
    [StringLength(128)]
    public string Description { get; set; }

    /// <summary>
    /// Holds digit in number
    /// </summary>
    [Required]
    public int DigitInNumber { get; set; }

    /// <summary>
    /// Holds active status
    /// </summary>
    [Required]
    public bool IsActive { get; set; }

    /// <summary>
    /// Holds default status
    /// </summary>
    [Required]
    public bool IsDefault { get; set; }

    /// <summary>
    /// Holds name of the series
    /// </summary>
    [Required]
    [StringLength(32)]
    public string Name { get; set; }

    /// <summary>
    /// Holds next number in the series
    /// </summary>
    [Required]
    public int NextNumber { get; set; }

    /// <summary>
    /// Holds prefix
    /// </summary>
    [Required]
    [StringLength(8)]
    public string Prefix { get; set; }

    /// <summary>
    /// Holds suffix
    /// </summary>
    //[Required]
    [StringLength(8)]
    public string Suffix { get; set; }
}