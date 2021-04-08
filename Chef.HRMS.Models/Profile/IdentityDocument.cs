using Chef.Common.Core;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public abstract class IdentityDocument : Model
    {
        /// <summary>
        /// Holds date of birth
        /// </summary>
        [Description("Date of birth as in the identity document")]
        public DateTime DateOfBirth { get; set; }

        /// <summary>
        /// Holds the employee id
        /// </summary>
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds the father's name as in the document
        /// </summary>
        [StringLength(32)]
        [Description("Father's name as in the identity document")]
        public string FatherName { get; set; }

        /// <summary>
        /// Holds the approved status
        /// </summary>
        [Description("Holds the approved status")]
        public bool IsApproved { get; set; }

        /// <summary>
        /// Holds the name as in the document
        /// </summary>
        [Required]
        [StringLength(32)]
        [Description("Name as in the identity document")]
        public string Name { get; set; }

        /// <summary>
        /// Holds document number
        /// </summary>
        [Required]
        [StringLength(16)]
        [Description("Number of the identity document")]
        public string Number { get; set; }
    }
}