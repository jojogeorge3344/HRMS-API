using Chef.Common.Core;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class Education : Model
    {
        /// <summary>
        /// Holds degree
        /// </summary>
        [Required]
        [StringLength(128)]
        [Description("Education Degree")]
        public string Degree { get; set; }

        /// <summary>
        /// Holds the employee id
        /// </summary>
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds percentage
        /// </summary>
        [Required]
        [Description("Percentage of marks")]
        [Range(0.0, 100.0)]
        public float Percentage { get; set; }

        /// <summary>
        /// Holds specialization
        /// </summary>
        [StringLength(128)]
        [Description("Education's specialization")]
        public string Specialization { get; set; }

        /// <summary>
        /// Holds university
        /// </summary>
        [Required]
        [StringLength(128)]
        [Description("Education University")]
        public string University { get; set; }

        /// <summary>
        /// Holds year of completion
        /// </summary>
        [Required]
        [Description("Year of completion")]
        public DateTime YearOfCompletion { get; set; }

        /// <summary>
        /// Holds year of joining
        /// </summary>
        [Description("Year of joining")]
        public DateTime YearOfJoining { get; set; }

        /// <summary>
        /// Holds the approved status
        /// </summary>
        [Description("Holds the approved status")]
        public bool IsApproved { get; set; }
    }
}