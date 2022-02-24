using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class AssetReasonViewModel : ViewModel
    {
        //public AssetChangeType Type  { get; set; }

        public int Type { get; set; }

        public string Description { get; set; }

       
    }
}
