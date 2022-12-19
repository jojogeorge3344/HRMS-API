using Chef.Common.Core;
using Chef.Common.Models;
using Chef.Common.Types;
using Chef.HRMS.Types;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class Dependent : Model
    {
        /// <summary>
        /// Holds date of birth
        /// </summary>
        [Description("Date of birth of the dependent")]
        public DateTime DateOfBirth { get; set; }

        /// <summary>
        /// Holds the employee id
        /// </summary>
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds gender
        /// </summary>
        [Description("Gender of the dependent")]
        public GenderType Gender { get; set; }

        /// <summary>
        /// Holds name
        /// </summary>
        [Required]
        [StringLength(32)]
        [Description("Name of the dependent")]
        public string Name { get; set; }

        /// <summary>
        /// Holds phone number
        /// </summary>
        [StringLength(16)]
        [Description("Phone number of the dependent")]
        public string Phone { get; set; }

        /// <summary>
        /// Holds profession
        /// </summary>
        [StringLength(32)]
        [Description("Profession of the dependent")]
        public string Profession { get; set; }

        /// <summary>
        /// Holds relationship
        /// </summary>
        [Description("Relationship to the employee")]
        public RelationshipType Relationship { get; set; }
    }
}