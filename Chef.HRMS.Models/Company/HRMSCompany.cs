using Chef.Common.Core;
using Chef.Common.Types;
using System;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class HRMSCompany : Model
{
    /// <summary>
    /// Holds type of business
    /// </summary>
    [Required]
    public BusinessType BusinessType { get; set; }

    /// <summary>
    /// Holds Date of incorporation
    /// </summary>
    [Required]
    public DateTime DateOfIncorporation { get; set; }

    /// <summary>
    /// Holds Identification number
    /// </summary>
    [Required]
    [StringLength(16)]
    public string IdentificationNumber { get; set; }

    /// <summary>
    /// Holds legal name
    /// </summary>
    [Required]
    [StringLength(64)]
    public string LegalName { get; set; }

    /// <summary>
    /// Holds Logo file path
    /// </summary>
    [StringLength(128)]
    public string LogoFilePath { get; set; }

    /// <summary>
    /// Holds short name
    /// </summary>
    [Required]
    [StringLength(8)]
    public string ShortName { get; set; }
}