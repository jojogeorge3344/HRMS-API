using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

[TableType("junctiontable")]
public class DrivingLicenseDocument : Model
{
    /// <summary>
    /// Holds the  driving license id
    /// </summary>
    [Description("id of driving license")]
    [ForeignKey("DrivingLicense")]
    public int DrivingLicenseId { get; set; }

    /// <summary>
    /// Holds the  document id
    /// </summary>
    [Description("id of document")]
    [ForeignKey("Document")]
    public int DocumentId { get; set; }
}
