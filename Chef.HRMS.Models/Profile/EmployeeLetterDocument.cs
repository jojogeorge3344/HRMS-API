using Chef.Common.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

[TableType("junctiontable")]
public class EmployeeLetterDocument : Model
{
    /// <summary>
    /// Holds the document id
    /// </summary>
    [ForeignKey("Document")]
    public int DocumentId { get; set; }

    /// <summary>
    /// Holds the employee letter id
    /// </summary>
    [ForeignKey("Employeeletter")]
    public int EmployeeLetterId { get; set; }
}
