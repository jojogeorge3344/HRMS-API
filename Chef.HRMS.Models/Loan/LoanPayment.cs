using Chef.Common.Core;
using Chef.HRMS.Types;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class LoanPayment : Model
{
    /// <summary>
    /// Holds payroll processing method id
    /// </summary>
    [ForeignKey("PayrollProcessingMethod")]
    [Required]
    public int PayrollProcessingMethodId { get; set; }

    /// <summary>
    /// Holds name of  employeeid
    /// </summary>
    [Required]
    [ForeignKey("Employeee")]
    [Description("id of employee")]
    public int Employeeid { get; set; }

    /// <summary>
    /// Holds the loan id 
    /// </summary>
    [Required]
    [ForeignKey("LoanRequest")]
    [Description("Loan id")]
    public int LoanId { get; set; }

    /// <summary>
    /// Holds the loan number 
    /// </summary>
    [Description("Loan number")]
    public string LoanNo { get; set; }

    /// <summary>
    /// Holds the loan type 
    /// </summary>
    [Description("Loan type")]
    public LoanType LoanType { get; set; }

    /// <summary>
    /// Holds the loan amount
    /// </summary>
    [Description("Loan amount")]
    public float LoanAmount { get; set; }

    /// <summary>
    /// Holds emi amount
    /// </summary>
    public float EMIAmount { get; set; }

    /// <summary>
    /// Holds loan setting id
    /// </summary>
    [Required]
    [ForeignKey("LoanSetting")]
    public int LoanSettingId { get; set; }

    /// <summary>
    /// Holds loan tenure number
    /// </summary>
    [Required]
    public int TenureNumber { get; set; }

    /// <summary>
    /// Holds loan remaining tenure
    /// </summary>
    [Required]
    public int RemainingTenure { get; set; }

    /// <summary>
    /// Holds balanceamount
    /// </summary>
    public float BalanceAmount { get; set; }
}
