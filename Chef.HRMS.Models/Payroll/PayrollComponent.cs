using Chef.Common.Core;
using Chef.HRMS.Types;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class PayrollComponent : Model
{
    /// <summary>
    /// Holds the payroll componnet description
    /// </summary>
    //[Required]
    [Description("Payroll component description")]
    public string Description { get; set; }

    /// <summary>
    /// Holds the payroll component name
    /// </summary>
    [Required]
    [Description("Payroll component name")]
    public string Name { get; set; }

    /// <summary>
    /// Holds the payroll component type
    /// </summary>
    //[Required]
    //[Description("Payroll component type")]
    public int PayrollComponentType { get; set; }

    /// <summary>
    /// Holds the payroll component short code
    /// </summary>
    [Required]
    [Description("Payroll component short code")]
    public string ShortCode { get; set; }

    /// <summary>
    /// Holds if it is fixed type
    /// </summary>
    public bool IsFixed { get; set; }
    public PayHeadType PayHeadType { get; set; }
    public PayHeadContractValueType PayHeadContractValueType { get; set; }
    public int MinimumLimit { get; set; }
    public PayHeadBaseUnitType PayHeadBaseUnitType { get; set; }
    public IncludeInPaySlipType IncludeInPaySlipType { get; set; }
    public RoundingType RoundingType { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public string TypeName { get; set; }
    public int MaximumLimit { get; set; }
    public int OrderNumber { get; set; }
}