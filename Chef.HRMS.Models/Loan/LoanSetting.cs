using Chef.Common.Core;
using Chef.HRMS.Types;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class LoanSetting : Model
{
    /// <summary>
    /// Holds Days
    /// </summary>
    [Required]
    public int EligibleDaysFromJoining { get; set; }

    /// <summary>
    /// Holds Interest Calcutation Method
    /// </summary>
    [Required]
    public InterestMethod InterestCalcutationMethod { get; set; }

    /// <summary>
    /// Holds is Eligible Based On Annual Gross Salary
    /// </summary>
    [Required]
    public bool IsEligibleBasedonAnnualGrossSalary { get; set; }

    /// <summary>
    /// Holds Probation Period
    /// </summary>
    [Required]
    public bool IsEligibleinAfterProbationPeriod { get; set; }

    /// <summary>
    /// Holds Notice Period
    /// </summary>
    [Required]
    public bool IsEligibleinNoticePeriod { get; set; }

    /// <summary>
    /// Holds Max Number of Installments
    /// </summary>
    [Required]
    public int MaxNumberofInstallments { get; set; }

    /// <summary>
    /// Holds Salary From 
    /// </summary>
    [Required]
    public decimal SalaryFromRange { get; set; }

    /// <summary>
    /// Holds  Salary To
    /// </summary>
    [Required]
    public decimal SalaryToRange { get; set; }

    /// <summary>
    /// Holds Interest Rate
    /// </summary>
    [Required]
    public int StandardInterestRate { get; set; }
    /// <summary>
    /// Holds the enable status
    /// </summary>n
    public bool isEnabled { get; set; }

    public int LoanAdvanceType { get; set; }
    public int LoanRepaymentType { get; set; }
}