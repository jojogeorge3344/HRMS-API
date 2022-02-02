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
    }
}
