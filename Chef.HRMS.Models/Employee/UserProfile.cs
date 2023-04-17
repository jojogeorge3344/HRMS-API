using Chef.Common.Core;
using Chef.Common.Models;
using Chef.Common.Types;
using Chef.HRMS.Types;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class UserProfile : Model
    {
        /// <summary>
        /// Holds blood group
        /// </summary>
        public BloodGroupType BloodGroup { get; set; }

        /// <summary>
        /// Holds display name
        /// </summary>
        public string DisplayName { get; set; }

        /// <summary>
        /// Holds first name
        /// </summary>
        [Required]
        public string FirstName { get; set; }

        /// <summary>
        /// Holds gender
        /// </summary>
        public GenderType Gender { get; set; }

        /// <summary>
        /// Holds last name
        /// </summary>
        public string LastName { get; set; }

        /// <summary>
        /// Holds martial status
        /// </summary>
        public MaritalStatusType MaritalStatus { get; set; }

        /// <summary>
        /// Holds middle name
        /// </summary>
        public string MiddleName { get; set; }
    }
}