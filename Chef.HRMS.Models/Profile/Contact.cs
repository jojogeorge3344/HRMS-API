using Chef.Common.Core;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class Contact : Model
    {
        /// <summary>
        /// Holds emergency contact name
        /// </summary>
        [StringLength(32)]
        public string EmergencyContactName { get; set; }

        /// <summary>
        /// Holds emergency contact number
        /// </summary>
        [StringLength(18)]

        public string EmergencyContactNumber { get; set; }

        /// <summary>
        /// Holds the employee id
        /// </summary>
        [ForeignKey("Employee")]
        public int EmployeeId { get; set; }

        /// <summary>
        /// Holds home phone number
        /// </summary>
        [StringLength(18)]
        public string HomePhone { get; set; }

        /// <summary>
        /// HOlds mobile number
        /// </summary>
        [Required]
        [StringLength(18)]
        public string Mobile { get; set; }

        /// <summary>
        /// Holds Personal Email
        /// </summary>
        [StringLength(32)]
        [EmailAddress]
        public string PersonalEmail { get; set; }

        /// <summary>
        /// Holds skype name
        /// </summary>
        [StringLength(16)]
        public string Skype { get; set; }

        /// <summary>
        /// Holds Work Email
        /// </summary>
        [StringLength(32)]
        [EmailAddress]
        public string WorkEmail { get; set; }

        /// <summary>
        /// Holds work phone number
        /// </summary>
        [Required]
        [StringLength(18)]
        public string WorkPhone { get; set; }
        
    }
}