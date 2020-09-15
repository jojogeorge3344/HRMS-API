using Chef.Common.Core;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Chef.HRMS.Models
{
    public class RoleFeature : Model
    {
        /// <summary>
        /// Holds feature id
        /// </summary>
        [Required]
        [Description("Id of assigned feature")]
        public int FeatureId { get; set; }

        /// <summary>
        /// Holds feature id
        /// </summary>
        [Required]
        [Description("Id of assigned subfeature")]
        public int SubFeatureId { get; set; }

        /// <summary>
        /// Holds role id
        /// </summary>
        [Required]
        [Description("Assigned roleid")]
        public int RoleId { get; set; }
    }
}