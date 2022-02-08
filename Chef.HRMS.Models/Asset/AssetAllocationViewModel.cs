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
        public string AssetName { get; set; }
        public int AssetTypeId { get; set; }
        public string Value { get; set; }
        public string Status { get; set; }
        public string AssetCode { get; set; }
        public int ValueId { get; set; }
        public string MetadataValue1 { get; set; }
        public string MetadataValue2 { get; set; }
        public string MetadataValue3 { get; set; }
        public string MetadataValue4 { get; set; }
        public string MetadataValue5 { get; set; }
        public int AssetMetadataValueId { get; set; }
        public int MetadataValueId2 { get; set; }
        public int MetadataValueId3 { get; set; }
        public int MetadataValueId4 { get; set; }
        public int MetadataValueId5 { get; set; }
    }
}
