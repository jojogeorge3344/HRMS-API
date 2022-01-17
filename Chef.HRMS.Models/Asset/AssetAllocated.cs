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
    [Table("assetallocated")]
    public class AssetAllocated : Model
    {
        [Required]
        [ForeignKey("AssetRaiseRequest")]
        public int AssetTypeId { get; set; }

        [Required]
        [ForeignKey("AssetRaiseRequest")]
        public int AssetRaiseRequestId { get; set; }

        [Required]
        [ForeignKey("Asset")]
        public int AssetId { get; set; }

        [Required]
        [ForeignKey("AssetMetadataValue")]
        public int AssetMetadataValueId { get; set; }

        [Required]
        [ForeignKey("AssetMetadataValue")]
        public int MetadataValueId2 { get; set; }

        [Required]
        [ForeignKey("AssetMetadataValue")]
        public int MetadataValueId3 { get; set; }

        [Required]
        [ForeignKey("AssetMetadataValue")]
        public int MetadataValueId4 { get; set; }

        [Required]
        [ForeignKey("AssetMetadataValue")]
        public int MetadataValueId5 { get; set; }


        [Required]
        [ForeignKey("AssetRaiseRequest")]
        public int EmpId { get; set; }

        [Required]
        [ForeignKey("Asset")]
        public string AssetName { get; set; }

        [Required]
        public DateTime AllocatedDate { get; set; }

        [Required]
        [ForeignKey("AssetRaiseRequest")]
        public AssetStatus Status { get; set; }

        [ForeignKey("Asset")]
        public string Description { get; set; }
    }
}
