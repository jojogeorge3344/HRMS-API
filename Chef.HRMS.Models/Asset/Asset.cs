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
        [ForeignKey("assettypeid")]
        public int AssetTypeId { get; set; }

        [ForeignKey("assettypemetadataid")]
        public int AssetTypeMetadataId { get; set; }

        [Required]
        public int AssetId { get; set; }


        [Required]
        public string AssetName { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Description { get; set; }

        //[Required]
        //public string Status { get; set; }

        [Required]
        public bool IsActive { get; set; }

        [Required]
        public string metadatavalue { get; set; }

    }
}