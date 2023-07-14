using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class Role : Model
{
    /// <summary>
    /// Holds role name
    /// </summary>
    [Required]
    [Description("Name of role")]
    public string Name { get; set; }
}