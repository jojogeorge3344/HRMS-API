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

    [Table("assetemployeewiserequest")]
    public class AssetEmployeeWiseRequest : Model
    {
        [ForeignKey("AssetRaiseRequest")]
        public int AssetRaiseRequestId { get; set; }

        [ForeignKey("AssetRaiseRequest")]
        public int RequestNo { get; set; }

        [ForeignKey("AssetRaiseRequest")]
        public int EmpId { get; set; }

        [ForeignKey("AssetRaiseRequest")]
        public int RequestFor { get; set; }

        [ForeignKey("AssetRaiseRequest")]
        public string RequestType { get; set; }

        [ForeignKey("AssetRaiseRequest")]
        public AssetStatus Status { get; set; }

        [Required]
        public DateTime RequestedOn { get; set; }

        [Required]
        public string RequestedBy { get; set; }


    }
}
