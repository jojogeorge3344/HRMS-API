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
    [Table("asset")]

    public class Asset : Model
    {
        [ForeignKey("AssetType")]
        public int AssetTypeId { get; set; }

        [ForeignKey("AssetTypeMetadata")]
        public int AssetTypeMetadataId { get; set; }

      //  [Required]
        public string ValueId { get; set; }

        [Required]
        public string AssetName { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public AssetStatus Status { get; set; }

        [Required]
        public bool IsActive { get; set; }

        public string AssetTypeName { get; set; }

        [Write(false)]
        [Skip(true)]
        public List<AssetMetadataValue> AssetMetadataValues { get; set; }
    }
}