using System.ComponentModel;

namespace Chef.HRMS.Models
{
    public class EmployeePayrollBreakupView
    {
        /// <summary>
        /// Holds the  amount
        /// </summary>
        [Description("amount")]
        public float Amount { get; set; }

        /// <summary>
        /// Holds the Uniqueidentity
        /// </summary>
        [Description("Uniqueidentity")]
        public string Uniqueidentity { get; set; }

        /// <summary>
        /// Holds the repayment amount
        /// </summary>
        [Description("repayment amount")]
        public float PaymentAmount { get; set; }

        /// <summary>
        /// Holds the type
        /// </summary>
        [Description("Type")]
        public string Type { get; set; }
    }
}
