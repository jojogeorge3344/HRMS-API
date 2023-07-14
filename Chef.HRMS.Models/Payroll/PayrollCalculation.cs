using Chef.Common.Core;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class PayrollCalculation : Model
{
    public bool IsComputed { get; set; }

    public string Formula { get; set; }

    [ForeignKey("PayrollComponent")]
    public int PayrollComponentId { get; set; }

    [ForeignKey("PayrollStructure")]
    public int PayrollStructureId { get; set; }
}
