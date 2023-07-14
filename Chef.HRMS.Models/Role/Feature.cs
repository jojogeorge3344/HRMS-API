using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class Feature : Model
{
    /// <summary>
    /// Holds feature name
    /// </summary>
    [Required]
    [Description("Name of feature")]
    public string Name { get; set; }
}