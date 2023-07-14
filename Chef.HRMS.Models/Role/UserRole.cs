using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class UserRole : Model
{
    /// <summary>
    /// Role user id
    /// </summary>
    [Required]
    [ForeignKey("Role")]
    [Description("Assigned roleid")]
    public int RoleId { get; set; }

    /// <summary>
    /// Holds user id
    /// </summary>
    [Required]
    [ForeignKey("Employee")]
    [Description("Assigned user")]
    public int EmployeeId { get; set; }
}