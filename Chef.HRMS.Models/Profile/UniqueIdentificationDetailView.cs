using System.ComponentModel;

namespace Chef.HRMS.Models;

public class UniqueIdentificationDetailView : IdentityDocument
{

    /// <summary>
    /// Holds the  unique identification detail id
    /// </summary>
    [Description("id of  unique identification detail")]
    public int UniqueIdentificationDetailId { get; set; }

    /// <summary>
    /// Holds the  document id
    /// </summary>
    [Description("id of document")]
    public int DocumentId { get; set; }

    /// <summary>
    /// Holds the  unique identification detail document id
    /// </summary>
    [Description("id of unique identification detail document")]
    public int UniqueIdentificationDetailDocumentId { get; set; }

    /// <summary>
    /// Holds the address as in the unique identification detail
    /// </summary>
    [Description("Address as in the unique identification detail")]
    public string Address { get; set; }

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
