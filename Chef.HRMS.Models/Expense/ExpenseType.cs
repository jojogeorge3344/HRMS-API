using Chef.Common.Core;
using Chef.HRMS.Types;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class ExpenseType : Model
    {
        /// <summary>
        /// Holds the expense type
        /// </summary>
        [Required]
        [StringLength(32)]
        [Description("Type of expense")]
        public string Name { get; set; }

        /// <summary>
        /// Holds description of the expense policy
        /// </summary>
        [Required]
        [StringLength(128)]
        [Description("Description of the expense type")]
        public string Description { get; set; }

        /// <summary>
        /// Holds code of the expense type
        /// </summary>
        [Required]
        [StringLength(12)]
        [Description("code of the expense type")]
        public string Code { get; set; }

        /// <summary>
        /// Holds category of the expense type
        /// </summary>
        [Required]
        [Description("Category of the expense type")]
        public ExpenseCategoryType Category { get; set; }
    }
}
