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
        public string Assettypename { get; set; }

        [StringLength(32)]
        public string Description { get; set; }

    }
}
