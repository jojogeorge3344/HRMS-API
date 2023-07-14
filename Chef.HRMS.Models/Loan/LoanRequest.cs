using Chef.Common.Core;
using Chef.Common.Models;
using Chef.HRMS.Models.Loan;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models;

public class LoanRequest : Model
{
    /// <summary>
    /// Holds comments
    /// </summary>
    [Required]
    public string Comments { get; set; }

    /// <summary>
    /// Holds EMI start month
    /// </summary>
    [Required]
    public int EMIStartsFromMonth { get; set; }

    /// <summary>
    /// Holds EMI start year
    /// </summary>
    [Required]
    public int EMIStartsFromYear { get; set; }

    /// <summary>
    /// Holds employee id reference
    /// </summary>
    [Required]
    [ForeignKey("Employee")]
    public int EmployeeID { get; set; }

    /// <summary>
    /// Holds disbursement expected on date
    /// </summary>
    [Required]
    public DateTime ExpectedOn { get; set; }

    /// <summary>
    /// Holds loan amount
    /// </summary>
    [Required]
    public decimal LoanAmount { get; set; }

    /// <summary>
    /// Holds loan number
    /// </summary>
    [Required]
    public string LoanNo { get; set; }

    /// <summary>
    /// Holds loan type
    /// </summary>
    [Required]
    public LoanType LoanType { get; set; }

    /// <summary>
    /// Holds loan setting id
    /// </summary>
    [Required]
    [ForeignKey("LoanSetting")]
    public int LoanSettingId { get; set; }

    /// <summary>
    /// Holds loan disbursement method
    /// </summary>
    [Required]
    public PaymentType PaymentType { get; set; }

    /// <summary>
    /// Holds repayment term in months
    /// </summary>
    [Required]
    public int RepaymentTerm { get; set; }

    /// <summary>
    /// Holds requested date
    /// </summary>
    [Required]
    public DateTime RequestedDate { get; set; }

    /// <summary>
    /// Holds the approved status
    /// </summary>
    public RequestStatusType Status { get; set; }
    public int ExtendedMonth { get; set; }
    public int RequestedBy { get; set; }

    [Write(false)]
    [Skip(true)]
    [SqlKata.Ignore]
    public List<LoanRequestDetail> LoanRequestDeatails { get; set; }
}