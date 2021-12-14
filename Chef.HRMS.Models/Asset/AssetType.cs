using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Chef.HRMS.Models
{
    [Table("assettype")]
    public class AssetType:Model
    {
        [Required]
        [StringLength(32)]
        /// Holds the name of assettype
        public string Assettypename { get; set; }

        [Required]
        [StringLength(128)]
        /// Holds the description of assettype
        public string Description { get; set; }

    }
}
