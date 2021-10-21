using Chef.Common.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class HRMSBranchBankAccount : BankAccount
    {
        /// <summary>
        /// Holds the branch Id
        /// </summary>
        [Required]
        [ForeignKey("HRMSBranch")]
        public int BranchId { get; set; }

        /// <summary>
        /// Holds the corporate Id
        /// </summary>
        [Required]
        [StringLength(16)]
        public string CorporateId { get; set; }
    }
}