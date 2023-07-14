using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class Document : Model
{
    /// <summary>
    /// Holds the extension of the file .pdf, .docx
    /// </summary>
    [Required]
    [StringLength(4)]
    [Description("File extension")]
    public string Extension { get; set; }

    /// <summary>
    /// Holds the name of the file
    /// </summary>
    [Required]
    [StringLength(64)]
    [Description("File name")]
    public string Name { get; set; }

    /// <summary>
    /// Holds the full file path
    /// </summary>
    [Required]
    [StringLength(256)]
    [Description("File path")]
    public string Path { get; set; }

    [Required]
    public int EmployeeId { get; set; }
}