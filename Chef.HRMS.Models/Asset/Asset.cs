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
    [Table("asset")]

    public class Asset : Model
    {
        [ForeignKey("AssetTypeId")]
        public int AssetTypeId { get; set; }

        [ForeignKey("AssetTypeMetadataId")]
        public int AssetTypeMetadataId { get; set; }

        [Required]
        public string AssetName { get; set; }

        public DateTime Date { get; set; }

        public string Description { get; set; }

        public string Status { get; set; }

        public bool IsActive { get; set; }

    }
}
