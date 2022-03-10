using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class AssetViewModel:ViewModel
    {
        public int AssetId { get; set; }
        public int AssetTypeId { get; set; }
        public string AssetTypeName { get; set; }

        public DateTime returnDate { get; set; }
        //public string ChangeDescription { get; set; }
        //public string ReturnDescription { get; set; }
        //public AssetChangeType ChangeType { get; set; }
        //public AssetReturnType ReturnType { get; set; }
    }
}
