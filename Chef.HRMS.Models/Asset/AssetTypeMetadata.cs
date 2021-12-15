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
    [Table("assettypemetadata")]
    public class AssetTypeMetadata : Model
    {
        [Required]
        [ForeignKey("AssetType")]
        public int AssettypeId { get; set; }

        [Required]
        [StringLength(128)]
        public string Metadata { get; set; }

        [Required]
        public string AssetDatatype { get; set; }

        [Required]
        public bool IsMandatory { get; set; }

    }
}
