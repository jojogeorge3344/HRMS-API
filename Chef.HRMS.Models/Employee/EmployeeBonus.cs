using Chef.Common.Core;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class EmployeeBonus : Model
    {
        /// <summary>
        /// Holds payroll processing method id
        /// </summary>
        [ForeignKey("PayrollProcessingMethod")]
        [Required]
        public int PayrollProcessingMethodId { get; set; }

        /// <summary>
        /// Holds reference to bonus type
        /// </summary>
        [ForeignKey("BonusType")]
        [Required]
        public int BonusTypeId { get; set; }

        /// <summary>
        /// Holds reference to employee
        /// </summary>
        [ForeignKey("Employee")]
        [Required]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds bonus amount
        /// </summary>
        [Required]
        public float Amount { get; set; }

        /// <summary>
        /// Holds disburse on date
        /// </summary>
        [Required]
        public DateTime DisburseOn { get; set; }

        /// <summary>
        /// Holds remarks
        /// </summary>
        public string Remarks { get; set; }
    }
}
