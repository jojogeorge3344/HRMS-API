using System;
using System.ComponentModel;

namespace Chef.HRMS.Models;

public class DrivingLicenseView : IdentityDocument
{
    /// <summary>
    /// Holds the  driving license id
    /// </summary>
    [Description("id of driving license")]
    public int DrivingLicenseId { get; set; }

    /// <summary>
    /// Holds the  document id
    /// </summary>
    [Description("id of document")]
    public int DocumentId { get; set; }

    /// <summary>
    /// Holds the  drivinglicense document id
    /// </summary>
    [Description("id of drivinglicense document")]
    public int DrivingLicenseDocumentId { get; set; }

    /// <summary>
    /// Holds the address as in the driving license
    /// </summary>
    [Description("Address as in the driving license")]
    public string Address { get; set; }

    /// <summary>
    /// Holds the date of expiry of the driving license
    /// </summary>
    [Description("Expiry date of the driving license")]
    public DateTime DateOfExpiry { get; set; }

    /// <summary>
    /// Holds the extension of the file .pdf, .docx
    /// </summary>
    [Description("File extension")]
    public string Extension { get; set; }

    /// <summary>
    /// Holds the name of the file
    /// </summary>
    [Description("File name")]
    public string FileName { get; set; }

    /// <summary>
    /// Holds the full file path
    /// </summary>
    [Description("File path")]
    public string Path { get; set; }
}
