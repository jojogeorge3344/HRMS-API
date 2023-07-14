using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

/// <summary>
/// Unique identification document
/// </summary>
public class UniqueIdentificationDetail : IdentityDocument
{
    /// <summary>
    /// Holds the address of the UID holders
    /// </summary>
    [Required]
    [Description("Address of the UID holder")]
    [StringLength(128)]
    public string Address { get; set; }
}