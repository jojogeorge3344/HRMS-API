using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class HolidayCategory : Model
{
    /// <summary>
    /// Holds the name of the category
    /// </summary>
    [Required]
    [StringLength(32)]
    public string Name { get; set; }
    /// <summary>
    /// Holds the year of the category
    /// </summary>
    [Required]
    public int Year { get; set; }

    /// <summary>
    /// Holds the details holiday category  is configured
    /// </summary>
    [Description("Holiday category is configured")]
    public bool IsConfigured { get; set; }
}