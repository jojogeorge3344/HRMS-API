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
    [Table("assetallocated")]
    public class AssetAllocated : Model
    {
        [ForeignKey("AssetMyAsset")]
        public int EmpId { get; set; }

        [ForeignKey("AssetMyAsset")]
        public int AssetMyAssetId { get; set; }

        [ForeignKey("AssetMyAsset")]
        public int ValueId { get; set; }

        [ForeignKey("AssetMyAsset")]
        public string AssetName { get; set; }

        [ForeignKey("AssetMyAsset")]
        public string Metadata { get; set; }

        [Required]
        public string NewAssetType { get; set; }

        [Required]
        public int NewAssetId { get; set; }

        [Required]
        public string NewAssetName { get; set; }

        [Required]
        public string NewMetadata { get; set; }

        [Required]
        public string Description { get; set; }
    }
}
