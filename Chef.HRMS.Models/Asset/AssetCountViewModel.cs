using Chef.Common.Core;
using Chef.HRMS.Types;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Chef.HRMS.Models
{
    public class AssetCountViewModel: ViewModel
        {
            public int AllocatedAsset { get; set; }
            public int Requests { get; set; } 
            public int EmpId { get; set; }
        }
}
