using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class DrivingLicense : IdentityDocument
{
    /// <summary>
    /// Holds the address as in the driving license
    /// </summary>
    [StringLength(128)]
    [Description("Address as in the driving license")]
    public string Address { get; set; }

    /// <summary>
    /// Holds the date of expiry of the driving license
    /// </summary>
    [Description("Expiry date of the driving license")]
    public DateTime DateOfExpiry { get; set; }

    //todo : license type has to be handled.
}