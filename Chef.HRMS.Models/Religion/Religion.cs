using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class Religion : Model
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; }

    [Required]
    [StringLength(10)]
    public string Code { get; set; }
    public bool Status { get; set; }
}
