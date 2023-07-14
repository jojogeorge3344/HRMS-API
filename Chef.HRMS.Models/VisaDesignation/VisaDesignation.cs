using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class VisaDesignation : Model
{
    [Required]
    [StringLength(128)]
    public string Description { get; set; }

    [Required]
    [StringLength(32)]
    public string Name { get; set; }
}
