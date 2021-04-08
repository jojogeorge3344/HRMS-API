using Chef.Common.Core;
using Chef.Common.Models;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class LeaveComponent : Model
    {
        /// <summary>
        /// Holds code
        /// </summary>
        [Required]
        [StringLength(3)]
        public string Code { get; set; }

        /// <summary>
        /// Holds name of the leave type
        /// </summary>
        [Required]
        [StringLength(32)]
        public string Name { get; set; }

        /// <summary>
        /// Holds the description
        /// </summary>
        [Required]
        [StringLength(256)]
        public string Description { get; set; }

        /// <summary>
        /// Holds paid leave status
        /// </summary>
        public bool IsPaidLeave { get; set; }

        /// <summary>
        /// Holds restricted to gender status
        /// </summary>
        public bool IsRestrictedToGender { get; set; }

        /// <summary>
        /// Holds restricted to marital status
        /// </summary>
        public bool IsRestrictedToMaritalStatus { get; set; }

        /// <summary>
        /// Holds sick leave status
        /// </summary>
        public bool IsSickLeave { get; set; }

        /// <summary>
        /// Holds statutory leave status
        /// </summary>
        public bool IsStatutoryLeave { get; set; }

        /// <summary>
        /// Holds restricted to gender type
        /// </summary>
        public GenderType RestrictedToGender { get; set; }

        /// <summary>
        /// Holds restricted to marital status type
        /// </summary>
        public MaritalStatusType RestrictedToMaritalStatus { get; set; }

        /// <summary>
        /// Holds show leave description status
        /// </summary>
        public bool ShowLeaveDescription { get; set; }
    }
}