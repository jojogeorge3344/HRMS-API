using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class ExpensePayment : Model
    {
        /// <summary>
        /// Holds id of the expense type
        /// </summary>
        [Required]
        [ForeignKey("Expense")]
        [Description("Id of the expense request")]
        public int ExpenseRequestId { get; set; }

        /// <summary>
        /// Holds id of the expense type
        /// </summary>
        [Required]
        [ForeignKey("ExpenseType")]
        [Description("Id of the expense type")]
        public int ExpenseTypeId { get; set; }

        /// <summary>
        /// Holds the expense type name
        /// </summary>
        [Required]
        [StringLength(32)]
        [Description("Name of expense type")]
        public string ExpenseTypeName { get; set; }

        /// <summary>
        /// Holds the expense title
        /// </summary>
        [Required]
        [StringLength(32)]
        [Description("Title of expense")]
        public string Name { get; set; }

        /// <summary>
        /// Holds the expense submission date
        /// </summary>
        [Required]
        [Description("Date of expense")]
        public DateTime ExpenseDate { get; set; }

        /// <summary>
        /// Holds  expense amount
        /// </summary>
        [Range(0, float.MaxValue)]
        [Description("Expense Amount")]
        public float Amount { get; set; }

        /// <summary>
        /// Holds the details of requested person
        /// </summary>
        [Required]
        [ForeignKey("Employee")]
        [Description("Who is requested")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds the comment 
        /// </summary>
        //[Required]
        [StringLength(250)]
        [Description("Comment by the payer")]
        public string Comment { get; set; }

        /// <summary>
        /// Holds the paid status
        /// </summary>
        public bool IsPaid { get; set; }

        /// <summary>
        /// Holds the PaymentMode
        /// </summary>
        public PaymentMode PaymentMode { get; set; }

        /// <summary>
        /// Holds the PaymentAccount details
        /// </summary>
        public PaymentAccount PaymentAccount { get; set; }
    }
}
