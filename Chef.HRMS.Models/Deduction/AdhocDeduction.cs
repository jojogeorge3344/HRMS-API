using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class AdhocDeduction : Model
    {
        /// <summary>
        /// Holds payroll processing method id
        /// </summary>
        [ForeignKey("PayrollProcessingMethod")]
        [Required]
        public int PayrollProcessingMethodId { get; set; }

        /// <summary>
        /// Holds reference to employee
        /// </summary>
        [ForeignKey("Employee")]
        [Required]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds the employee code
        /// </summary>
        //[Required]
        public string EmployeeCode { get; set; }

        /// <summary>
        /// Holds the adhoc deduction name
        /// </summary>
        [Description("Title of adhoc deduction")]
        //[Required]
        [StringLength(32)]
        public string DeductionName { get; set; }

        /// <summary>
        /// Holds the description
        /// </summary>
        [Description("Description about  adhoc deduction")]
        //[Required]
        [StringLength(128)]
        public string Description { get; set; }

        /// <summary>
        /// Holds the currency type
        /// </summary>
        [Description("Currency type")]
        //[Required]
        [StringLength(3)]
        public string Currency { get; set; }

        /// <summary>
        /// Holds the adhoc deduction amount
        /// </summary>
        [Description("Adhoc deduction amount")]
        [Required]
        public float Amount { get; set; }

        public DateTime Date { get; set; }

        public PayrollProcessingStatus Status { get; set; }

        public string AdhocBFCode { get; set; }

        public string Remarks { get; set; }

        public int PayrollComponentId { get; set; }

        public bool IsAddition { get; set; }

        public int PayrollProcessYear { get; set; }

        public int PayrollProcessMonth { get; set; }
    }
}
