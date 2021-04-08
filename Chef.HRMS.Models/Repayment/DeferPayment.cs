using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class DeferPayment : Model
    {
        /// <summary>
        /// Holds reference to employee
        /// </summary>
        [ForeignKey("Employee")]
        [Required]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds the loan number 
        /// </summary>
        [Description("Loan number")]
        public string LoanNumber { get; set; }

        /// <summary>
        /// Holds the Defer period detail
        /// </summary>
        [Description("Defer period")]
        public int DeferPeriod { get; set; }

        /// <summary>
        /// Holds the Defer payment period type
        /// </summary>
        [Description("Defer payment day")]
        public GeneralPeriodType PaymentPeriodType { get; set; }

        /// <summary>
        /// Holds the description
        /// </summary>
        [Description("Description about  Defer payment")]
        [Required]
        [StringLength(128)]
        public string Description { get; set; }
    }
}
