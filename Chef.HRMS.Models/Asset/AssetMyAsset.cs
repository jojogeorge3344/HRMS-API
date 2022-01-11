using Chef.Common.Core;
using Chef.HRMS.Types;
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
        [Required]
        [ForeignKey("AssetType")]
        public int AssetTypeId { get; set; }

        [Required]
        [ForeignKey("Asset")]
        public int AssetId { get; set; }

        [Required]
        [ForeignKey("AssetTypeMetadata")]
        public int AssetTypeMetadataId { get; set; }

        [Required]
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
        [ForeignKey("Asset")]
        public AssetStatus Status { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public AssetChangeType ChangeType { get; set; }
    }
}
