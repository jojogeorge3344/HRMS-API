using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class JobTitle : Model
{
    /// <summary>
    /// Holds description of the job
    /// </summary>
    [Required]
    [StringLength(128)]
    public string Description { get; set; }

    /// <summary>
    /// Holds name of the job
    /// </summary>
    [Required]
    [StringLength(32)]
    public string Name { get; set; }
}