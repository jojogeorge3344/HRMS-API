using Chef.Common.Core;
using Chef.Common.Models;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class PayrollComponentConfiguration : Model
{
    /// <summary>
    /// Specify that the claim frequency is monthly,weekly or yearly
    /// </summary>
    [Description("claim frequency type")]
    public ClaimFrequencyType ClaimFrequency { get; set; }

    /// <summary>
    /// Specify that the amount per claim
    /// </summary>
    [Description("Amount Limit per claim")]
    public float ClaimLimit { get; set; }

    /// <summary>
    /// Holds the benefit code description
    /// </summary>
    [StringLength(128)]
    [Description("Description of the Benefit")]
    public string Description { get; set; }

    /// <summary>
    /// Specify that this component customized and overrriden at employee level
    /// </summary>
    [Description("Is customized and overriden at employ level")]
    public bool IsCustomizedAndOverridenAtEmployeeLevel { get; set; }

    /// <summary>
    /// Specify that the difference amount is adjustable(paid value-actual value due to lop) against special allowance
    /// </summary>
    [Description("Is difference amount adjustable")]
    public bool IsDifferenceAmountAdjustable { get; set; }

    /// <summary>
    /// Specify that loss of pay of employee is affecting this component value
    /// </summary>
    [Description("Is loss of pay affected")]
    public bool IsLossOfPayAffected { get; set; }

    /// <summary>
    /// Specify that this component is paid separately
    /// </summary>
    [Description("Is paid separately")]
    public bool IsPaidSeparately { get; set; }

    /// <summary>
    /// Specify that this component include arrear calculation or not
    /// </summary>
    [Description("Is arrear calculation included")]
    public bool IsPartOfArrearCalculation { get; set; }

    /// <summary>
    /// Specify that this allowence as part of earnings and deductions
    /// </summary>
    [Description("Is part of earnings and Deductions")]
    public bool IsPartOfEarningsAndDeductions { get; set; }

    /// <summary>
    /// Specify that loss of pay of employee is affecting this component value
    /// </summary>
    [Description("Is loss of pay affected or not")]
    public bool IsPartOfLossOfPayCalculation { get; set; }

    /// <summary>
    /// Specify that is employee requires to submit the proof
    /// </summary>
    [Description("Is proof required")]
    public bool IsProofRequired { get; set; }

    /// <summary>
    /// Specify that is this a recurring deduction
    /// </summary>
    [Description("Is this deduction  recurring")]
    public bool IsRecurring { get; set; }

    /// <summary>
    /// Specify that this component is Visible in payslip
    /// </summary>
    [Description("Is visible in payslip")]
    public bool IsVisibleInPayslip { get; set; }

    /// <summary>
    /// Holds maximum limit per annum
    /// </summary>
    [Description("Maximum limit")]
    public decimal MaximumLimit { get; set; }

    /// <summary>
    /// Holds a benefit code name
    /// </summary>
    [Required]
    [StringLength(150)]
    [Description("Name of the Benefit")]
    public string Name { get; set; }

    /// <summary>
    /// Specify that the payout pattern
    /// </summary>
    [Description("Payout pattern")]
    public PayoutPattern PayoutPattern { get; set; }

    /// <summary>
    /// Holds a benefit type Id
    /// </summary>
    [Required]
    [Description("Payroll Component Type")]
    public Chef.HRMS.Types.PayrollComponentType PayrollComponentType { get; set; }

    /// <summary>
    /// Holds the payroll component id
    /// </summary>
    [Required]
    [ForeignKey("PayrollComponent")]
    [Description("Payroll component id")]
    public int PayrollComponentId { get; set; }

    /// <summary>
    /// Holds the payroll structure id
    /// </summary>
    [Required]
    [ForeignKey("PayrollStructure")]
    [Description("Payroll structure id")]
    public int PayrollStructureId { get; set; }

    /// <summary>
    /// Holds a benefit code of three characters
    /// </summary>
    [Required]
    [StringLength(14)]
    [Description("Short code of the BenefitCode in 14 Characters")]
    public string ShortCode { get; set; }

    /// <summary>
    /// Holds the details payroll component is configured
    /// </summary>
    [Description("Payroll component is configured")]
    public bool IsConfigured { get; set; }
    [Write(false)]
    [Skip(false)]
    [SqlKata.Ignore]
    public int CategoryId { get; set; }
}