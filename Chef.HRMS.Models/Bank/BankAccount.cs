using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models;

public class BankAccount : Model
{

    [Required]
    [StringLength(36)]
    public string AccountNumber { get; set; }

    [Required]
    [StringLength(126)]
    public string AccountName { get; set; }

    [Required]
    public string BankName { get; set; }

    [Required]
    public string BranchName { get; set; }

    [StringLength(11)]
    public string IFSCCode { get; set; }

}
