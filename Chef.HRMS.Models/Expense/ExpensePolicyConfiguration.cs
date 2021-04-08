using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class ExpensePolicyConfiguration : Model
    {
        /// <summary>
        /// Holds the expense policy
        /// </summary>
        //[Required]
        [StringLength(32)]
        [ForeignKey("ExpensePolicy")]
        [Description("Name of expense policy")]
        public string ExpensePolicyName { get; set; }

        /// <summary>
        /// Holds the expense type
        /// </summary>
        //[Required]
        [StringLength(32)]
        [ForeignKey("ExpenseType")]
        [Description("Type of expense")]
        public string Name { get; set; }

        /// <summary>
        /// Holds code of the expense type
        /// </summary>
       // [Required]
        [StringLength(12)]
        [ForeignKey("ExpenseType")]
        [Description("code of the expense type")]
        public string Code { get; set; }

        /// <summary>
        /// Holds the currency code in expense policy
        /// </summary>
        //[Required]
        [StringLength(3)]
        [ForeignKey("ExpensePolicy")]
        [Description("Currency code in expense policy")]
        public string Currency { get; set; }

        /// <summary>
        /// Holds the expense type id
        /// </summary>
        [Required]
        [ForeignKey("ExpenseType")]
        [Description("Expense type id")]
        public int ExpenseTypeId { get; set; }

        /// <summary>
        /// Holds the expense policy id
        /// </summary>
        [Required]
        [ForeignKey("ExpensePolicy")]
        [Description("Expense polcy id")]
        public int ExpensePolicyId { get; set; }

        /// <summary>
        /// Holds category of the expense type
        /// </summary>
        [Required]
        [Description("Category of the expense type")]
        public ExpenseCategoryType Category { get; set; }

        /// <summary>
        /// Holds the value that we can limit the maximum expense based on period type
        /// </summary>
        [Required]
        [Description("Can we limit the maximum expense based on period type")]
        public bool IsExpenseLimitEnabled { get; set; }

        /// <summary>
        /// Holds maximum expense limit
        /// </summary>
        [Description("Maximum expense lImit")]
        public float MaximumExpenseLimit { get; set; }

        /// <summary>
        /// Holds maximum expense limit period type
        /// </summary>
        [Description("Maximum expense lImit period type")]
        public GeneralPeriodType ExpensePeriodType { get; set; }

        /// <summary>
        /// Holds  is submission proof requires for expense
        /// </summary>
        [Description("Is submission proof requires for expense")]
        public bool IsProofRequired { get; set; }

        /// <summary>
        /// Holds the value that we can limit the maximum number of instances based on period type
        /// </summary>
        [Required]
        [Description("Can we limit the maximum number of instances based on period type")]
        public bool IsInstanceLimitEnabled { get; set; }

        /// <summary>
        /// Holds maximum number of instances 
        /// </summary>
        [Description("Maximum instances limit")]
        public int MaximumInstancesLimit { get; set; }

        /// <summary>
        /// Holds maximum instances limit period type
        /// </summary>
        [Description("Maximum instances limit period type")]
        public GeneralPeriodType InstancesPeriodType { get; set; }

        /// <summary>
        /// Holds mark as expired  if submitted beyond corresponding days from the day expense incurred is enabled
        /// </summary>
        [Description("Mark as expired  if submitted beyond corresponding days from the day expense incurred is enabled")]
        public bool isExpiryMarked { get; set; }

        /// <summary>
        /// Holds expiry days of expense incurred 
        /// </summary>
        [Description("Expiry days of expense incurred")]
        public int DaysPassed { get; set; }

        /// <summary>
        /// Holds mileage calculation unit
        /// </summary>
        [Description("Mileage calculation unit")]
        public UnitType MileageUnit { get; set; }

        /// <summary>
        /// Holds default mileage rate
        /// </summary>
        [Description("Default mileage rate")]
        public float MileageRate { get; set; }

        /// <summary>
        /// Holds is comment required when amount exceeds
        /// </summary>
        [Description("Is comment required when amount exceeds")]
        public bool IsCommentRequired { get; set; }

        /// <summary>
        /// Holds maximum limit for comment
        /// </summary>
        [Description("Maximum limit for comment")]
        public float MaximumLimitComment { get; set; }

        /// <summary>
        /// Holds is receipt required when amount exceeds
        /// </summary>
        [Description("Is receipt required when amount exceeds")]
        public bool IsReceiptRequired { get; set; }

        /// <summary>
        /// Holds maximum limit for receipt 
        /// </summary>
        [Description("maximum limit for receipt")]
        public float MaximumLimitReceipt { get; set; }

        /// <summary>
        /// Holds the details expense type is configured
        /// </summary>
        [Description("ExpenseType is configured")]
        public bool IsConfigured { get; set; }
    }
}
