using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    public class UserRoleView
    {
        /// <summary>
        /// Holds user id
        /// </summary>
        [Required]
        [ForeignKey("Employee")]
        [Description("Assigned user")]
        public int EmployeeId { get; set; }
        /// <summary>
        /// Holds role name
        /// </summary>
        [Required]
        [Description("Name of role")]
        public string RoleName { get; set; }

        /// <summary>
        /// Role user id
        /// </summary>
        [Required]
        [ForeignKey("Role")]
        [Description("Assigned roleid")]
        public int RoleId { get; set; }
        /// <summary>
        /// Holds feature name
        /// </summary>
        [Required]
        [Description("Name of feature")]
        public string FeatureName { get; set; }

        /// <summary>
        /// Holds feature id
        /// </summary>
        [Required]
        [Description("Id of assigned feature")]
        public int FeatureId { get; set; }
        /// <summary>
        /// Holds subfeature name
        /// </summary>
        [Required]
        [Description("Name of subfeature")]
        public string SubFeatureName { get; set; }

        /// <summary>
        /// Holds subfeature id
        /// </summary>
        [Required]
        [Description("Id of assigned subfeature")]
        public int SubFeatureId { get; set; }

    }
}
