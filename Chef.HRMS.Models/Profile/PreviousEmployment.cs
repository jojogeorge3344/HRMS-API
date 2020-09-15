using Chef.Common.Core;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class PreviousEmployment : Model
    {
        /// <summary>
        /// Holds company name
        /// </summary>
        [Required]
        [StringLength(64)]
        [Description("Previous company name")]
        public string CompanyName { get; set; }

        /// <summary>
        /// Holds year of joining
        /// </summary>
        [Required]
        [Description("Date of joining")]
        public DateTime DateOfJoining { get; set; }

        /// <summary>
        /// Holds year of relieving
        /// </summary>
        [Required]
        [Description("Date of relieving")]
        public DateTime DateOfRelieving { get; set; }

        /// <summary>
        /// Holds the employee id
        /// </summary>
        [Required]
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds job title
        /// </summary>
        [Required]
        [StringLength(64)]
        [Description("Job title")]
        public string JobTitle { get; set; }

        /// <summary>
        /// Holds location
        /// </summary>
        [Required]
        [StringLength(64)]
        [Description("Location of the company")]
        public string Location { get; set; }

        /// <summary>
        /// Holds the approved status
        /// </summary>
        [Description("Holds the approved status")]
        public bool IsApproved { get; set; }
    }
}