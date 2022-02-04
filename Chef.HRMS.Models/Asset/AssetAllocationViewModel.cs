using Chef.Common.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class AssetAllocationViewModel : ViewModel
    {
        public string RequestNo { get; set; }
        public string RequestedBy { get; set; }
        public string Description { get; set; }
        public string AllocationTo { get; set; }
        public DateTime AllocationDate { get; set; }
        public int AssetId { get; set; }
        public int AssetTypeId { get; set; }
        public int AssetMetadataValueId { get; set; }
        public string Value { get; set; }

        public int ValueId { get; set; }

    }
}
