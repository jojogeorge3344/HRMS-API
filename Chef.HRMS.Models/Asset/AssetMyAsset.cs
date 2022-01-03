using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    [Table("assetmyasset")]
    public class AssetMyAsset : Model
    {
        [ForeignKey("AssetType")]
        public int AssetTypeId { get; set; }

        [ForeignKey("Asset")]
        public int AssetId { get; set; }

        [ForeignKey("AssetTypeMetadata")]
        public int AssetTypeMetadataId { get; set; }

        [ForeignKey("Employee")]
        public int EmpId { get; set; }

        [Required]
        public string AssetType { get; set; }

        [Required]
        public int ValueId { get; set; }

        [Required]
        public string AssetName { get; set; }

        [Required]
        public DateTime DateAllocated { get; set; }

        [Required]
        public string Metadata { get; set; }

        [Required]
        public string Status { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
