using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class HRMSBank : Model
{
    [Required]
    [StringLength(100)]
    public string Code { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; }

    [Required]
    [StringLength(200)]
    public string Address { get; set; }

    [Required]
    [StringLength(50)]
    public string Status { get; set; }
}

