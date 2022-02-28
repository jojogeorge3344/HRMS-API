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
        //[required]
        public int AllocationId { get; set; }

        [ForeignKey("AssetRaiseRequest")]
        public int AssetTypeId { get; set; }

        [ForeignKey("AssetRaiseRequest")]
        public string AssetTypeName { get; set; }

        [ForeignKey("AssetRaiseRequest")]
        public int AssetRaiseRequestId { get; set; }

        [ForeignKey("Asset")]
        public int AssetId { get; set; }

        [ForeignKey("AssetMetadataValue")]
        public int AssetMetadataValueId { get; set; }

        public int MetadataValueId2 { get; set; }

        public int MetadataValueId3 { get; set; }

        public int MetadataValueId4 { get; set; }

        public int MetadataValueId5 { get; set; }

        [ForeignKey("AssetRaiseRequest")]
        public int EmpId { get; set; }

        [ForeignKey("Asset")]
        public string AssetName { get; set; }

        public DateTime AllocatedDate { get; set; }

        [ForeignKey("AssetRaiseRequest")]
        public AssetStatus Status { get; set; }

        [ForeignKey("Asset")]
        [Required]
        public string Description { get; set; }
        public string AllocationTo { get; set; }
        public string AllocatorComments { get; set; }



    }
}
