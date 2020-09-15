using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class ExpensePolicy : Model
    {
        /// <summary>
        /// Holds description of the expense policy
        /// </summary>
        [Required]
        [StringLength(128)]
        [Description("Description of the expense policy")]
        public string Description { get; set; }

        /// <summary>
        /// Holds name of the expense policy
        /// </summary>
        [Required]
        [StringLength(32)]
        [Description("Name of the expense policy")]
        public string Name { get; set; }

        /// <summary>
        /// Holds the currency code
        /// </summary>
        [Required]
        [StringLength(3)]
        [Description("Currency Code")]
        public string Currency { get; set; }

        /// <summary>
        /// Holds the details expense policy is configured
        /// </summary>
        [Description("ExpensePolicy is configured")]
        public bool IsConfigured { get; set; }
    }
}
