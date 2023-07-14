using Chef.Common.Core;
using Chef.Common.Types;
using Chef.HRMS.Types;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

[Table("hrmsemployee")]
public class HRMSEmployee : Model
{
    /// <summary>
    /// Holds Date of Birth
    /// </summary>
    [Required]
    public DateTime DateOfBirth { get; set; }

    /// <summary>
    /// Holds Display Name
    /// </summary>
    [Required]
    [StringLength(32)]
    public string DisplayName { get; set; }

    /// <summary>
    /// Holds the Email Address
    /// </summary>
    //[Required]
    // [EmailAddress]
    public string Email { get; set; }

    /// <summary>
    /// Holds First Name
    /// </summary>
    [Required]
    [StringLength(32)]
    public string FirstName { get; set; }

    /// <summary>
    /// Holds Gender
    /// </summary>
    [Required]
    public GenderType Gender { get; set; }

    /// <summary>
    /// Holds Last Name
    /// </summary>
    [Required]
    [StringLength(32)]
    public string LastName { get; set; }

    /// <summary>
    /// Holds Middle Name
    /// </summary>
    [StringLength(32)]
    public string MiddleName { get; set; }

    /// <summary>
    /// Holds martial status
    /// </summary>
    public MaritalStatusType MaritalStatus { get; set; }

    /// <summary>
    /// Holds blood group
    /// </summary>
    public BloodGroupType BloodGroup { get; set; }

    public string UserId { get; set; }
    public string FileNumber { get; set; }

    public Int64 UIDNumber { get; set; }

    public string LanguageKnown { get; set; }
    public int ReligionId { get; set; }
    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string ReligionName { get; set; }

    public string Remarks { get; set; }

    public string RefNum { get; set; }

}